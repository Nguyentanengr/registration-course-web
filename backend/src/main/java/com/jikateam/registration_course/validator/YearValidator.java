package com.jikateam.registration_course.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class YearValidator implements ConstraintValidator<ValidYear, Integer> {

    @Override
    public boolean isValid(Integer year, ConstraintValidatorContext context) {

        int currentYear = LocalDate.now().getYear();
        return year != null && year >= currentYear;
    }
}
