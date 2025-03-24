package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.request.CreatePhaseRequest;
import com.jikateam.registration_course.dto.request.UpdatePhaseRequest;
import com.jikateam.registration_course.dto.response.PhaseResponse;
import com.jikateam.registration_course.entity.RegistrationPhase;
import jakarta.servlet.Registration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.lang.annotation.Target;

@Mapper(componentModel = "spring")
public interface PhaseConverter {

    RegistrationPhase mapToRegistrationPhaseEntity(CreatePhaseRequest createPhaseRequest);

    PhaseResponse mapToPhaseResponse(RegistrationPhase registrationPhase);

    RegistrationPhase updateToRegistrationPhaseEntity(UpdatePhaseRequest request
            , @MappingTarget RegistrationPhase registrationPhase);
}
