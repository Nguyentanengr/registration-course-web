package com.jikateam.registration_course.dto.response;

public record ExportResponse <T> (

        String filename,
        T recourse,
        Long contentLength
) {
}
