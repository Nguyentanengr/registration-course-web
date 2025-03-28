package com.jikateam.registration_course.dto.request;

import com.jikateam.registration_course.constant.RegistrationStatus;

import java.util.List;

public record UpdateStatusOpenSessionListRequest(
        List<UpdateSingleStatusOpenSessionRequest> openSessions

) {

}
