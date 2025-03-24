package com.jikateam.registration_course.dto.request;

import com.jikateam.registration_course.constant.PhaseType;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreatePhaseRequest(

        @NotBlank(message = "PHASE_NAME_IS_BLANK")
        @NotNull(message = "PHASE_NAME_IS_BLANK")
        String registrationPhaseName,

        @NotNull(message = "PHASE_TYPE_IS_BLANK")
        PhaseType type,

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
