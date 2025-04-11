package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.Gender;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record StudentRegisterResponse(
    String studentId,
    String fullname,
    LocalDate dateOfBirth,
    Gender gender,
    LocalDateTime registerDate
) {
}
