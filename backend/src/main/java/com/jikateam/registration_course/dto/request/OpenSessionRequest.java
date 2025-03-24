package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OpenSessionRequest(

        @NotBlank(message = "SESSION_ID_IS_BLANK")
        @NotNull(message = "SESSION_ID_IS_BLANK")
        Integer sessionId,

        @NotBlank(message = "REGISTRATION_PHASE_ID_IS_BLANK")
        @NotNull(message = "REGISTRATION_PHASE_ID_IS_BLANK")
        Integer registrationPhaseId,

        @NotBlank(message = "MANAGER_ID_IS_BLANK")
        @NotNull(message = "MANAGER_ID_IS_BLANK")
        String managerId
) {
}
