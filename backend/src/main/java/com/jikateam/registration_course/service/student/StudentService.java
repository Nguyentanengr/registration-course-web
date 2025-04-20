package com.jikateam.registration_course.service.student;

import com.jikateam.registration_course.converter.StudentConverter;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.ListStudentRegisterResponse;
import com.jikateam.registration_course.dto.response.StudentInfoResponse;
import com.jikateam.registration_course.dto.response.StudentRegisterResponse;
import com.jikateam.registration_course.entity.Student;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.EnrollmentRepository;
import com.jikateam.registration_course.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final StudentConverter studentConverter;
    private final EnrollmentRepository enrollmentRepository;

    public List<StudentRegisterResponse> getAllStudentByOpenSessionId(Integer openSessionId) {

        List<Object[]> response = studentRepository.getAllByOpenSessionId(openSessionId);

        log.info("Result size for student register response: {}", response.size());
        return response.stream().map((arrayResponse) -> {
            var student = (Student) arrayResponse[0];
            var registerDate = (LocalDateTime) arrayResponse[1];
            return studentConverter.mapToStudentRegisterResponse(student, registerDate);
        }).toList();

    }

    public List<ListStudentRegisterResponse> getAllStudentByOpenSessionIds(List<Integer> openSessionIds) {

        List<Object[]> response = studentRepository.getAllByOpenSessionIds(openSessionIds);

        Map<Integer, ListStudentRegisterResponse> map =new HashMap<>();

        response.forEach((arrayResponse) -> {
            var openSessionId = (Integer) arrayResponse[0];
            var student = (Student) arrayResponse[1];
            var registerDate = (LocalDateTime) arrayResponse[2];
            var courseId = (String) arrayResponse[3];
            var classId = (String) arrayResponse[4];
            var groupNumber = (Integer) arrayResponse[5];

            if (!map.containsKey(openSessionId)) {
                map.put(openSessionId, ListStudentRegisterResponse.builder()
                        .openSessionId(openSessionId)
                        .courseId(courseId)
                        .classId(classId)
                        .groupNumber(groupNumber)
                        .students(new ArrayList<StudentRegisterResponse>())
                        .build());
            }

            var students = map.get(openSessionId).students();

            students.add(StudentRegisterResponse.builder()
                    .studentId(student.getStudentId())
                    .fullname(student.getFullname())
                    .gender(student.getGender())
                    .dateOfBirth(student.getDateOfBirth())
                    .registerDate(registerDate)
                    .build());

        });

        if (map.size() != openSessionIds.size()) {
            throw new BusinessException(CodeResponse.EXPORT_STUDENT_ERROR);
        }

        log.info("Fetched student list for {} sessions.", map.size());

        List<ListStudentRegisterResponse> responses = new ArrayList<>();
        map.forEach((key, value) -> {
            responses.add(value);
        });

        return responses;
    }


    public StudentInfoResponse getByAccountId(Integer accountId) {

        // Truy vấn thông tin vè student, class, major theo accountId
        Object[] response = studentRepository.getByAccountId(accountId).get(0); // [studentId, fullname, majorName, classId, currentSemester, currentYear]

        log.info("Result for accountId {} is: {}", accountId, response);
        var studentId = (String) response[0];

        // truy vấn tổng s ố tín chỉ mà student đó đã học theo studentId
        Long accumulateCredits = enrollmentRepository.getAccumulateCreditsByStudentId(studentId);

        log.info("Accumulate credits of student {} is: {}", studentId, accumulateCredits);
        return StudentInfoResponse.builder()
                .studentId(studentId)
                .studentName((String) response[1])
                .majorName((String) response[2])
                .classId((String) response[3])
                .currentSemester((Integer) response[4])
                .currentYear((Integer) response[5] + (Integer) response[6] - 1)
                .educationProgramId((Integer) response[7])
                .studyPlanId((String) response[8])
                .accumulateCredits(accumulateCredits)
                .build();
    }
}
