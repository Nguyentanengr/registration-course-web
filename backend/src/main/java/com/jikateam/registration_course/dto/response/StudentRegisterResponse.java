package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.constant.Gender;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record StudentRegisterResponse(
    String studentId,
    String fullname,
    LocalDate dateOfBirth,
    Gender gender,
    LocalDateTime registerDate
) {
}
