package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.DayOfWeek;

import java.time.LocalDate;

public record ScheduleOnSessionResponse(
        Integer scheduleId,
        String teacherName,
        String teacherId,
        String placeId,
        Integer startPeriod,
        Integer endPeriod,
        DayOfWeek dayOfWeek,
        LocalDate startDate,
        LocalDate endDate
) {
}
