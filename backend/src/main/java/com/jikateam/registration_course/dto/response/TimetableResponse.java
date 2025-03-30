package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.DayOfWeek;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record TimetableResponse(
        String courseId,
        String courseName,
        Integer group,
        String placeId,
        String teacherName,
        DayOfWeek dayOfWeek,
        Integer startPeriod,
        Integer endPeriod

) {
}
