package com.jikateam.registration_course.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record PageSessionInfoResponse (

        Integer totalPages,

        List<SessionInfoResponse> sessions
) {
}
