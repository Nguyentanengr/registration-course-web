package com.jikateam.registration_course.dto.response;

import java.time.LocalDateTime;

public record PhaseResponse(
        String registrationPhaseId,
        String registrationPhaseName,
        Integer semester,
        Integer year,
        LocalDateTime openTime,
        LocalDateTime closeTime
) {
}
