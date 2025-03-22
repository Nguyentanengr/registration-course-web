package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UpdateSchedulesRequest(

        List<ScheduleRequest> schedules
) {
}
