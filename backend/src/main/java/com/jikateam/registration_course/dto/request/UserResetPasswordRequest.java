package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record UserResetPasswordRequest(

        @NotBlank(message = "OTP_IS_BLANK")
        @NotNull(message = "OTP_IS_BLANK")
        @Size(min = 6, max = 6, message = "OTP_INVALID_SIZE")
        String code,

        @NotBlank(message = "EMAIL_IS_BLANK")
        @NotNull(message = "EMAIL_IS_BLANK")
        @Size(min = 8, max = 255, message = "EMAIL_INVALID_SIZE")
        @Email(message = "EMAIL_INVALID_FORMAT")
        String email,

        @NotBlank(message = "PASSWORD_IS_BLANK")
        @NotNull(message = "PASSWORD_IS_BLANK")
        @Size(min = 8, max = 255, message = "PASSWORD_INVALID_SIZE")
        String newPassword

) {}
