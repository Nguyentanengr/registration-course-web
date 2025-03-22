package com.jikateam.registration_course.controller.session;

import com.jikateam.registration_course.dto.request.CreateSessionRequest;
import com.jikateam.registration_course.dto.request.DeleteSessionListRequest;
import com.jikateam.registration_course.dto.request.UpdateSchedulesRequest;
import com.jikateam.registration_course.dto.request.UpdateSessionInfoRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.SchedulesOnSessionResponse;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
import com.jikateam.registration_course.service.session.CreateSingleSessionService;
import com.jikateam.registration_course.service.session.DeleteSessionService;
import com.jikateam.registration_course.service.session.UpdateSessionInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = SessionController.SESSION_API_URL)
public class SessionController {

    public static final String SESSION_API_URL = "/api/v1/sessions";

    private final CreateSingleSessionService createSingleSessionService;
    private final UpdateSessionInfoService updateSessionInfoService;
    private final DeleteSessionService deleteSessionService;

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

    @PutMapping("/{id}")
    public DataResponse<SessionInfoResponse> updateSessionInfo
            (@RequestBody @Valid UpdateSessionInfoRequest request, @PathVariable("id") Integer sessionId) {

        SessionInfoResponse response = updateSessionInfoService.update(request, sessionId);
        CodeResponse codeResponse = CodeResponse.UPDATE_SESSION_SUCCESSFULLY;
        return DataResponse.<SessionInfoResponse>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(response)
                .build();
    }

    @PutMapping("/{id}/schedules")
    public DataResponse<SchedulesOnSessionResponse> updateScheduleOnSession
            (@RequestBody @Valid UpdateSchedulesRequest request) {

        CodeResponse codeResponse = CodeResponse.UPDATE_SESSION_SUCCESSFULLY;
        return DataResponse.<SchedulesOnSessionResponse>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(null)
                .build();
    }

    @DeleteMapping("/{id}")
    public DataResponse<Void> deleteSession(@PathVariable("id") Integer sessionId) {

        deleteSessionService.deleteSession(sessionId);
        CodeResponse codeResponse = CodeResponse.DELETE_SESSION_SUCCESSFULLY;
        return DataResponse.<Void>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .build();
    }

    @DeleteMapping
    public DataResponse<Void> deleteSessionList(@RequestBody DeleteSessionListRequest request) {

        deleteSessionService.deleteSessionList(request);
        CodeResponse codeResponse = CodeResponse.DELETE_SESSION_SUCCESSFULLY;
        return DataResponse.<Void>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .build();
    }





}
