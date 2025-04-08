package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.dto.request.CreateSessionRequest;
import com.jikateam.registration_course.dto.request.UpdateSessionInfoRequest;
import com.jikateam.registration_course.dto.response.RegisterSessionInfoResponse;
import com.jikateam.registration_course.dto.response.SchedulesOnSessionResponse;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
import com.jikateam.registration_course.dto.response.SessionNoStatusResponse;
import com.jikateam.registration_course.entity.Session;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SessionConverter {

    Session mapToSessionEntity(CreateSessionRequest request);

    Session updateToSessionEntity(UpdateSessionInfoRequest request, @MappingTarget Session session);

    @Mapping(source = "s.course", target = "courseInfo")
    @Mapping(source = "s.clazz.clazzId", target = "clazzId")
    @Mapping(target = "status", source = "status")
    @Mapping(target = "scheduleIds", source = "scheduleIds")
    SessionInfoResponse mapToSessionInfoResponse(Session s, RegistrationStatus status, List<Integer> scheduleIds);

    @Mapping(source = "s.course", target = "courseInfo")
    @Mapping(source = "s.clazz.clazzId", target = "clazzId")
    @Mapping(target = "status", source = "status")
    SessionInfoResponse mapToSessionInfoResponse(Session s, RegistrationStatus status);

    @Mapping(source = "s.course", target = "courseInfo")
    @Mapping(source = "s.clazz.clazzId", target = "clazzId")
    SessionInfoResponse mapToSessionInfoResponse(Session s);

    SchedulesOnSessionResponse mapToSchedulesOnSessionResponse(Session session);

    @Mapping(source = "course", target = "courseInfo")
    @Mapping(source = "clazz.clazzId", target = "clazzId")
    SessionNoStatusResponse mapToSessionNoStatusResponse(Session session);

    @Mapping(source = "s.clazz.clazzId", target = "classId")
    @Mapping(source = "s.course", target = "courseInfo")
    RegisterSessionInfoResponse mapToRegisterSessionInfoResponse(Session s, Integer empty);

}
