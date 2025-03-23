package com.jikateam.registration_course.dto.request;

import com.jikateam.registration_course.constant.SessionStatus;
import lombok.Builder;

@Builder
public record SessionFilterRequest(
        String searchKey,
        Integer year,
        Integer semester,
        String clazzId,
        String courseId,
        SessionStatus status,
        Integer page,
        Integer size,
        String fieldSorted,
        String sorter
) {
}
