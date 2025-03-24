package com.jikateam.registration_course.converter;


import com.jikateam.registration_course.dto.response.OpenSessionInfoResponse;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OpenSessionConverter {


    @Mapping(target = "session.courseInfo", source = "session.course")
    @Mapping(target = "session.clazzId", source = "session.clazz.clazzId")
    OpenSessionInfoResponse mapToOpenSessionInfoResponse(OpenSessionRegistration openSessionRegistration);

}
