package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.request.CreateSessionRequest;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
import com.jikateam.registration_course.entity.Session;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SessionConverter {

    Session mapToSessionEntity(CreateSessionRequest request);

    @Mapping(source = "course", target = "courseInfo")
    @Mapping(source = "clazz.clazzId", target = "clazzId")
    SessionInfoResponse mapToSessionInfoResponse(Session session);

}
