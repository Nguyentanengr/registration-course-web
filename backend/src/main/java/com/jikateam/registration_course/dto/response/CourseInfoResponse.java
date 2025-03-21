package com.jikateam.registration_course.dto.response;

public record CourseInfoResponse(

        String courseId,
        String courseName,
        Integer credits
) {
}
