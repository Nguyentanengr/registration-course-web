package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.DayOfWeek;

import java.time.LocalDate;

public record ScheduleInfoResponse (
        Integer scheduleId,
        DayOfWeek dayOfWeek,
        Integer startPeriod,
        Integer endPeriod,
        LocalDate startDate,
        LocalDate endDate
) {
}
