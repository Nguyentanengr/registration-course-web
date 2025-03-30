package com.jikateam.registration_course.dto.response;

import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record SchedulesOnWeekResponse(
        Integer week,
        LocalDate startDate,
        LocalDate endDate,
        List<TimetableResponse> timetables
) {
}
