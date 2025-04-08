package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.RegistrationStatus;
import org.springframework.web.bind.support.SessionStatus;

import java.time.LocalDate;
import java.util.List;

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
        RegistrationStatus status,
        List<Integer> scheduleIds
) {
}
