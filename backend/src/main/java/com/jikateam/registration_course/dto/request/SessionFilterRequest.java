package com.jikateam.registration_course.dto.request;

import lombok.Builder;

@Builder
public record SessionFilterRequest(
        String searchKey,
        Integer year,
        Integer semester,
        String clazzId,
        String courseId,
        Integer page,
        Integer size,
        String fieldSorted,
        String sorter
) {
}
