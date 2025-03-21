package com.jikateam.registration_course.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;

@Builder
public record RefreshTokenResponse(
        String accessToken,

//        @JsonIgnore
        String refreshToken
) {}
