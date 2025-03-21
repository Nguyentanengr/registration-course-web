package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.SessionStatus;
import com.jikateam.registration_course.entity.Clazz;
import com.jikateam.registration_course.entity.Course;

import java.time.LocalDate;

public record SessionInfoResponse (
        Integer sessionId,
        CourseInfoResponse courseInfo,
        String clazzId,
        Integer year,
        Integer semester,
        Integer groupNumber,
        Integer minStudents,
        Integer maxStudents,
        LocalDate startDate,
        LocalDate endDate,
        SessionStatus status
) {
}
