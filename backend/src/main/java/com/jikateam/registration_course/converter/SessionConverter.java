package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.request.CreateSessionRequest;
import com.jikateam.registration_course.dto.request.UpdateSessionInfoRequest;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
import com.jikateam.registration_course.entity.Session;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SessionConverter {

    Session mapToSessionEntity(CreateSessionRequest request);

    Session updateToSessionEntity(UpdateSessionInfoRequest request, @MappingTarget Session session);

    @Mapping(source = "course", target = "courseInfo")
    @Mapping(source = "clazz.clazzId", target = "clazzId")
    SessionInfoResponse mapToSessionInfoResponse(Session session);

}
