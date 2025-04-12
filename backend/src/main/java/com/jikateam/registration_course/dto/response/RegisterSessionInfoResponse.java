package com.jikateam.registration_course.dto.response;

import java.util.List;

public record RegisterSessionInfoResponse(
        Integer sessionId,
        String classId,
        Integer groupNumber,
        Integer maxStudents,
        CourseInfoResponse courseInfo,
        List<ScheduleInfoResponse> schedules
) {
}
