package com.jikateam.registration_course.controller.openSession;


import com.jikateam.registration_course.dto.request.CreateOpenSessionListRequest;
import com.jikateam.registration_course.dto.request.OpenSessionRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.OpenSessionInfoResponse;
import com.jikateam.registration_course.service.openSession.CreateOpenSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = OpenSessionController.OPEN_SESSION_API_URL)
public class OpenSessionController {

    public static final String OPEN_SESSION_API_URL = "/api/v1/open-sessions";

    private final CreateOpenSessionService createOpenSessionService;

    @PostMapping("/batch")
    public DataResponse<List<OpenSessionInfoResponse>> createOpenSession
            (@RequestBody CreateOpenSessionListRequest request) {


        List<OpenSessionInfoResponse> responses = createOpenSessionService.createList(request);

        CodeResponse codeResponse = CodeResponse.CREATE_OPEN_SESSION_SUCCESSFULLY;
        return DataResponse.<List<OpenSessionInfoResponse>>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(responses)
                .build();
    }
}
