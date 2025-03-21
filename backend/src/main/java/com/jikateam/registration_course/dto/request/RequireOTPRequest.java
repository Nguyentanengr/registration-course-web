package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record RequireOTPRequest(

        @NotBlank(message = "EMAIL_IS_BLANK")
        @NotNull(message = "EMAIL_IS_BLANK")
        @Size(min = 8, max = 255, message = "EMAIL_INVALID_SIZE")
        @Email(message = "EMAIL_INVALID_FORMAT")
        String email
) {}
