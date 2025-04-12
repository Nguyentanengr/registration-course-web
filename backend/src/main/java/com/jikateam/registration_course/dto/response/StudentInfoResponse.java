package com.jikateam.registration_course.dto.response;

import lombok.Builder;

@Builder
public record StudentInfoResponse (
        String studentId,
        String studentName,
        String majorName,
        String classId,
        Long accumulateCredits,
        Integer currentSemester,
        Integer currentYear,
        Integer educationProgramId,
        String studyPlanId
) {
}
