package com.jikateam.registration_course.dto.response;

public record ConformOpenSessionResponse(
        Integer openSessionId,
        Integer sessionId,
        String courseId,
        String courseName,
        String classId,
        Integer groupNumber,
        Integer year,
        Integer semester,
        Long students
) {}
