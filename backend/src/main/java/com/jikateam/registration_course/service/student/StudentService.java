package com.jikateam.registration_course.service.student;

import com.jikateam.registration_course.converter.StudentConverter;
import com.jikateam.registration_course.dto.response.StudentRegisterResponse;
import com.jikateam.registration_course.entity.Student;
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

    public List<StudentRegisterResponse> getAllStudentByOpenSessionId(Integer openSessionId) {

        List<Object[]> response = studentRepository.getAllByOpenSessionId(openSessionId);

        log.info("Result size for student register response: {}", response.size());
        return response.stream().map((arrayResponse) -> {
            var student = (Student) arrayResponse[0];
            var registerDate = (LocalDateTime) arrayResponse[1];
            return studentConverter.mapToStudentRegisterResponse(student, registerDate);
        }).toList();
    }
}
