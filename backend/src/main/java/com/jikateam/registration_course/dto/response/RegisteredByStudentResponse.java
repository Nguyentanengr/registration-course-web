package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.RegistrationStatus;

import java.time.LocalDateTime;

public record RegisteredByStudentResponse(
        Integer openSessionId,
        RegistrationStatus status,
        LocalDateTime registerAt,
        RegisterSessionInfoResponse sessionInfo
) {
}
