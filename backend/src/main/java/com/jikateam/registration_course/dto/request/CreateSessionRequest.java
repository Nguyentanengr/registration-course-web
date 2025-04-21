package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.List;

public record CreateSessionRequest(

        @NotBlank(message = "COURSE_ID_IS_BLANK")
        @NotNull(message = "COURSE_ID_IS_BLANK")
        String courseId,

        @NotBlank(message = "CLASS_ID_IS_BLANK")
        @NotNull(message = "CLASS_ID_IS_BLANK")
        String clazzId,

        Integer year,

        @Min(value = 1, message = "INVALID_SEMESTER")
        @Max(value = 3, message = "INVALID_SEMESTER")
        Integer semester,

        @Min(value = 1, message = "INVALID_GROUP_NUMBER")
        @Max(value = 10, message = "INVALID_GROUP_NUMBER")
        Integer groupNumber,

        @Min(value = 1, message = "INVALID_STUDENT_QUANTITY")
        Integer minStudents,

        @Max(value = 1000, message = "INVALID_STUDENT_QUANTITY")
        Integer maxStudents,

        @NotNull
        @NotEmpty
        List<ScheduleRequest> scheduleRequests
) {

        @AssertTrue(message = "INVALID_STUDENT_QUANTITY")
        public boolean isGreaterThan() {
               return minStudents <= maxStudents;
        }

        @AssertTrue(message = "INVALID_SESSION_YEAR")
        public boolean isFutureYear() {
               return year >= LocalDate.now().getYear() - 1;
        }

}
