package com.jikateam.registration_course.dto.request;

import com.jikateam.registration_course.constant.DayOfWeek;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record ScheduleRequest(

        @NotBlank(message = "COURSE_ID_IS_BLANK")
        @NotNull(message = "COURSE_ID_IS_BLANK")
        String teacherId,

        @NotBlank(message = "COURSE_ID_IS_BLANK")
        @NotNull(message = "COURSE_ID_IS_BLANK")
        String placeId,

        @NotNull
        DayOfWeek dayOfWeek,

        @Min(value = 1, message = "INVALID_PERIOD")
        Integer startPeriod,

        @Max(value = 12, message = "INVALID_PERIOD")
        Integer endPeriod,

        @Future(message = "START_DATE_IS_PAST")
        LocalDate startDate,

        @Future(message = "END_DATE_IS_PAST")
        LocalDate endDate
) {

    @AssertTrue(message = "INVALID_PERIOD")
    public boolean isGreaterThan() {
        return startPeriod <= endPeriod;
    }

    @AssertTrue(message = "INVALID_TIME_DURATION")
    public boolean isBeforeDate() {
        return startDate.isBefore(endDate);
    }
}
