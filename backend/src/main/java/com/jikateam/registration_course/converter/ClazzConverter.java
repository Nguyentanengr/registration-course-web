package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.request.ClazzInfoResponse;
import com.jikateam.registration_course.dto.response.CourseInfoResponse;
import com.jikateam.registration_course.entity.Clazz;
import com.jikateam.registration_course.entity.Course;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClazzConverter {

    ClazzInfoResponse mapToClazzInfoResponse(Clazz clazz);

}
