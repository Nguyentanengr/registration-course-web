package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.response.TeacherInfoResponse;
import com.jikateam.registration_course.entity.Teacher;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeacherConverter {

    TeacherInfoResponse mapToTeacherInfoResponse(Teacher teacher);
}
