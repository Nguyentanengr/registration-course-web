package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.response.CourseInfoResponse;
import com.jikateam.registration_course.entity.Course;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CourseConverter {

    CourseInfoResponse mapToCourseInfoResponse(Course course);

}
