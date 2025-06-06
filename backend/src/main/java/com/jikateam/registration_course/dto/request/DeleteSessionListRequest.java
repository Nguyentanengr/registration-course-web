package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DeleteSessionListRequest (
        @NotNull(message = "SESSIONS_NOT_PROVIDED")
        List<Integer> sessionIds
) {
}
