package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DeletePhaseListRequest(
        @NotNull(message = "PHASES_NOT_PROVIDED")
        List<Integer> phaseIds
) {
}
