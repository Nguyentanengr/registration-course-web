package com.jikateam.registration_course.controller.session;

import com.jikateam.registration_course.dto.request.CreateSessionRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
import com.jikateam.registration_course.service.session.CreateSingleSessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = SessionController.SESSION_API_URL)
public class SessionController {

    public static final String SESSION_API_URL = "/api/v1/sessions";

    private final CreateSingleSessionService createSingleSessionService;

    @PostMapping
    public DataResponse<SessionInfoResponse> createSingleSession
            (@RequestBody @Valid CreateSessionRequest request) {

        SessionInfoResponse response = createSingleSessionService.createSession(request);

        log.info("Data response: {}", response);

        CodeResponse codeResponse = CodeResponse.CREATE_SESSION_SUCCESSFULLY;
        return DataResponse.<SessionInfoResponse>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(response)
                .build();
    }


}
