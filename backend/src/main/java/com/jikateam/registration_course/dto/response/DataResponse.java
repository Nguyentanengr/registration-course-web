package com.jikateam.registration_course.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;


@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record DataResponse<T>(
        Long code,
        String message,
        T data
) {}
