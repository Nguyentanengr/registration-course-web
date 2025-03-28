package com.jikateam.registration_course.dto.response;

import java.util.List;

public record RegisterSessionInfoResponse(
        Integer sessionId,
        String classId,
        CourseInfoResponse courseInfo,
        Integer groupNumber,
        Integer maxStudents,
        List<ScheduleInfoResponse> schedules
) {
}
