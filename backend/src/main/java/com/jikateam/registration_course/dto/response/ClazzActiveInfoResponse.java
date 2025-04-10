package com.jikateam.registration_course.dto.response;

import lombok.Builder;

@Builder
public record ClazzActiveInfoResponse (

        String clazzId,
        Integer nextYear,
        Integer nextSemester
) {

}
