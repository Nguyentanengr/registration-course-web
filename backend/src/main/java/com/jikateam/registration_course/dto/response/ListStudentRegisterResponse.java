package com.jikateam.registration_course.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ListStudentRegisterResponse(

        Integer openSessionId,

        String courseId,

        String classId,

        Integer groupNumber,

        List<StudentRegisterResponse> students
) {
}
