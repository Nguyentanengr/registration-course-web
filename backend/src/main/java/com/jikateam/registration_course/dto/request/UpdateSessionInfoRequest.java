package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record UpdateSessionInfoRequest(

        @Min(value = 1, message = "INVALID_GROUP_NUMBER")
        @Max(value = 10, message = "INVALID_GROUP_NUMBER")
        Integer groupNumber,

        @Min(value = 1, message = "INVALID_STUDENT_QUANTITY")
        Integer minStudents,

        @Max(value = 1000, message = "INVALID_STUDENT_QUANTITY")
        Integer maxStudents
) {

        @AssertTrue(message = "INVALID_STUDENT_QUANTITY")
        public boolean isGreaterThan() {
               return minStudents <= maxStudents;
        }

}
