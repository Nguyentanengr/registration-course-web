package com.jikateam.registration_course.dto.request;

import java.util.List;

public record CreateOpenSessionListRequest(

        List<OpenSessionRequest> openSessions
) {
}
