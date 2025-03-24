package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.PhaseType;

import java.time.LocalDateTime;

public record PhaseResponse(
        String registrationPhaseId,
        String registrationPhaseName,
        PhaseType type,
        LocalDateTime openTime,
        LocalDateTime closeTime
) {
}
