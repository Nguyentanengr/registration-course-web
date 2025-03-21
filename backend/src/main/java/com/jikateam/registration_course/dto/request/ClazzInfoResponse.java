package com.jikateam.registration_course.dto.request;

public record ClazzInfoResponse(

        String clazzId,

        Integer numberOfStudents,

        Integer startYear,

        Integer endYear,

        Integer currentSemester
) {

}
