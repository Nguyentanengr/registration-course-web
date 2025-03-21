package com.jikateam.registration_course.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;


@Builder
public record UserAuthenticationResponse(

        UserResponse user,

        String accessToken,

//        @JsonIgnore
        String refreshToken
) {}
