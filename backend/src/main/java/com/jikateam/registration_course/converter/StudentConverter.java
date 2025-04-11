package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.response.StudentRegisterResponse;
import com.jikateam.registration_course.entity.Student;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Mapper
public interface StudentConverter {

    StudentRegisterResponse mapToStudentRegisterResponse(Student student, LocalDateTime registerDate);
}
