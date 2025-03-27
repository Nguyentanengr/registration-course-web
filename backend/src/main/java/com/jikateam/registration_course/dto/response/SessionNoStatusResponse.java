package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.RegistrationStatus;

import java.time.LocalDate;

public record SessionNoStatusResponse(
        Integer sessionId,
        CourseInfoResponse courseInfo,
        String clazzId,
        Integer year,
        Integer semester,
        Integer groupNumber,
        Integer minStudents,
        Integer maxStudents,
        LocalDate startDate,
        LocalDate endDate
) {
}
