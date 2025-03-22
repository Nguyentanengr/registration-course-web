package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.DayOfWeek;
import com.jikateam.registration_course.entity.Place;

import java.time.LocalDate;

public record ScheduleResponse(

        String scheduleId,
        TeacherInfoResponse teacher,
        PlaceInfoResponse place,
        DayOfWeek dayOfWeek,
        Integer startPeriod,
        Integer endPeriod,
        LocalDate startDate,
        LocalDate endDate
) {
}
