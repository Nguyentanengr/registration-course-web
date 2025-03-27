package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.RegistrationStatus;
import lombok.Builder;

@Builder
public record OpenSessionInfoResponse(

        String openSessionRegistrationId,
        PhaseResponse registrationPhase,
        RegistrationStatus status,
        SessionNoStatusResponse session,
        Long numberOfRegister

) {
}
