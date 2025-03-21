package com.jikateam.registration_course.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = YearValidator.class)
public @interface ValidYear {

    String message() default "INVALID_SESSION_YEAR";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
