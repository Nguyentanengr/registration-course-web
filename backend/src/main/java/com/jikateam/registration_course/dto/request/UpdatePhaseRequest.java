package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public record UpdatePhaseRequest(

        @NotBlank(message = "PHASE_NAME_IS_BLANK")
        @NotNull(message = "PHASE_NAME_IS_BLANK")
        String registrationPhaseName,

        @Min(1)
        @Max(3)
        @NotNull(message = "PHASE_SEMESTER_IS_BLANK")
        Integer semester,

        @NotNull(message = "PHASE_YEAR_IS_BLANK")
        Integer year,

        @Future(message = "PHASE_TIME_IN_PAST")
        LocalDateTime openTime,

        @Future(message = "PHASE_TIME_IN_PAST")
        LocalDateTime closeTime
) {

    @AssertTrue(message = "INVALID_TIME_DURATION")
    public boolean isBeforeDate() {
        return openTime.isBefore(closeTime);
    }
}
