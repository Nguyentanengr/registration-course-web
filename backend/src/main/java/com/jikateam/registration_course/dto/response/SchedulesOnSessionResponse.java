package com.jikateam.registration_course.dto.response;

import java.util.List;

public record SchedulesOnSessionResponse(

        String sessionId,
        List<ScheduleResponse> schedules
) {
}
