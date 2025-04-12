package com.jikateam.registration_course.service.student;

import com.jikateam.registration_course.converter.StudentConverter;
import com.jikateam.registration_course.dto.response.StudentInfoResponse;
import com.jikateam.registration_course.dto.response.StudentRegisterResponse;
import com.jikateam.registration_course.entity.Student;
import com.jikateam.registration_course.repository.EnrollmentRepository;
import com.jikateam.registration_course.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
