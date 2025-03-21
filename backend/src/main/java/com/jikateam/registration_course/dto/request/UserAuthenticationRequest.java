package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.Email;
import lombok.Builder;

@Builder
public record UserAuthenticationRequest(

        String username,

        String password
) {}
