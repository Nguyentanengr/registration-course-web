package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.RegistrationStatus;

public record RegisterOpenSessionResponse(
        String openSessionId,
        RegistrationStatus status,
        Boolean isRegistered,
        RegisterSessionInfoResponse sessionInfo,
        Long numberOfRegister
) {
}
