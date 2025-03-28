package com.jikateam.registration_course.dto.request;

import com.jikateam.registration_course.constant.RegistrationStatus;

public record UpdateSingleStatusOpenSessionRequest(


        Integer openSessionId,

        RegistrationStatus status

) {
}
