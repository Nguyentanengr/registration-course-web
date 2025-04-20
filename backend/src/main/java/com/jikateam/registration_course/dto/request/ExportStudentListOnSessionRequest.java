package com.jikateam.registration_course.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ExportStudentListOnSessionRequest(

        @NotNull(message = "EXPORT_SESSION_ID_IS_EMPTY")
        List<Integer> openSessionIds
) {
}
