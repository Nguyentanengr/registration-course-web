package com.jikateam.registration_course.converter;


import com.jikateam.registration_course.dto.response.OpenSessionInfoResponse;
import com.jikateam.registration_course.dto.response.RegisterOpenSessionResponse;
import com.jikateam.registration_course.dto.response.RegisterSessionInfoResponse;
import com.jikateam.registration_course.dto.response.RegisteredByStudentResponse;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface OpenSessionConverter {


    @Mapping(target = "session.courseInfo", source = "o.session.course")
    @Mapping(target = "session.clazzId", source = "o.session.clazz.clazzId")
    @Mapping(target = "registrationPhase.phaseId", source = "o.registrationPhase.registrationPhaseId")
    @Mapping(target = "registrationPhase.phaseName", source = "o.registrationPhase.registrationPhaseName")
    @Mapping(target = "numberOfRegister", source = "numberOfRegister")
    OpenSessionInfoResponse mapToNewOpenSessionInfoResponse
            (OpenSessionRegistration o, Long numberOfRegister);


    @Mapping(source = "o.session.course", target = "sessionInfo.courseInfo")
    @Mapping(source = "o.session.clazz.clazzId", target = "sessionInfo.classId")
    @Mapping(source = "o.openSessionRegistrationId", target = "openSessionId")
    @Mapping(source = "o.session", target = "sessionInfo")
    RegisterOpenSessionResponse mapToRegisterSessionInfoResponse
            (OpenSessionRegistration o, boolean isRegistered, Long numberOfRegister);

    @Mapping(source = "o.session.course", target = "sessionInfo.courseInfo")
    @Mapping(source = "o.session.clazz.clazzId", target = "sessionInfo.classId")
    @Mapping(source = "o.openSessionRegistrationId", target = "openSessionId")
    @Mapping(source = "o.session", target = "sessionInfo")
    RegisteredByStudentResponse mapToRegisteredByStudentResponse
            (OpenSessionRegistration o, LocalDateTime registerAt);



}
