package com.jikateam.registration_course.dto.response;

public record ClazzInfoResponse(

        String clazzId,

        Integer numberOfStudents,

        Integer startYear,

        Integer endYear,

        Integer currentSemester
) {

}
