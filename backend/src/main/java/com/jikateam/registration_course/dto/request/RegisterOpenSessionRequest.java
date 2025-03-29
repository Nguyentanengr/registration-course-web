package com.jikateam.registration_course.dto.request;

import com.jikateam.registration_course.constant.EnrollmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterOpenSessionRequest(
        @NotNull
        @NotBlank
        String studentId,

        @NotNull
        Integer openSessionId,

        @NotNull
        EnrollmentStatus status
) {
}
