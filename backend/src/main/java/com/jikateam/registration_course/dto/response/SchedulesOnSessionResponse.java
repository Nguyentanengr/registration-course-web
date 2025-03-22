package com.jikateam.registration_course.dto.response;

import java.util.Set;

public record SchedulesOnSessionResponse(

        String sessionId,
        Set<ScheduleResponse> schedules
) {
}
