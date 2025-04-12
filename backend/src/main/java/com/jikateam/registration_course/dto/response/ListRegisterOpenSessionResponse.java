package com.jikateam.registration_course.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ListRegisterOpenSessionResponse(
        LocalDateTime startTime,
        LocalDateTime endTime,
        List<RegisterOpenSessionResponse> openSessions
) {
}
