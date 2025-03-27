package com.jikateam.registration_course.controller.openSession;


import com.jikateam.registration_course.dto.request.CreateOpenSessionListRequest;
import com.jikateam.registration_course.dto.request.DeleteOpenSessionListRequest;
import com.jikateam.registration_course.dto.request.OpenSessionRequest;
import com.jikateam.registration_course.dto.request.UpdateStatusOpenSessionRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.OpenSessionInfoResponse;
import com.jikateam.registration_course.service.openSession.CreateOpenSessionService;
import com.jikateam.registration_course.service.openSession.DeleteOpenSessionService;
import com.jikateam.registration_course.service.openSession.SearchFilterOpenSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = OpenSessionController.OPEN_SESSION_API_URL)
public class OpenSessionController {

    public static final String OPEN_SESSION_API_URL = "/api/v1/open-sessions";

    private final CreateOpenSessionService createOpenSessionService;
    private final SearchFilterOpenSessionService searchFilterOpenSessionService;
    private final DeleteOpenSessionService deleteOpenSessionService;

    @GetMapping
    public DataResponse<List<OpenSessionInfoResponse>> getAllSessionByPhaseAndClass(
            @RequestParam(defaultValue = "") String searchKey,
            @RequestParam(required = false) Integer phaseId,
            @RequestParam(required = false) String classId
    ) {

        List<OpenSessionInfoResponse> responses = searchFilterOpenSessionService
                .getAllByPhaseAndClass(searchKey, phaseId, classId);

        log.info("Response for params searchKey: {}, phaseId: {}, classId: {}: {}"
                , searchKey, phaseId, classId, responses.stream()
                        .map(OpenSessionInfoResponse::openSessionRegistrationId).toList());

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<OpenSessionInfoResponse>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();
    }

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

    @DeleteMapping("/{id}")
    public DataResponse<Void> deleteOpenSession(@PathVariable("id") Integer openSessionId) {

        deleteOpenSessionService.deleteSingleOpenSession(openSessionId);

        CodeResponse codeResponse = CodeResponse.DELETE_SESSION_SUCCESSFULLY;
        return DataResponse.<Void>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .build();
    }

    @DeleteMapping("/batch")
    public DataResponse<Void> deleteOpenSessionList(@RequestBody DeleteOpenSessionListRequest request) {

        deleteOpenSessionService.deleteBatchOpenSession(request);

        CodeResponse codeResponse = CodeResponse.DELETE_SESSION_SUCCESSFULLY;
        return DataResponse.<Void>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .build();
    }

    @PostMapping("/{id}")
    public DataResponse<OpenSessionInfoResponse> ConfirmOpenSession(
            @PathVariable("id") Integer openSessionId,
            @RequestBody UpdateStatusOpenSessionRequest request
    ) {


        CodeResponse codeResponse = CodeResponse.UPDATE_OPEN_SESSION_STATUS_SUCCESSFULLY;
        return DataResponse.<OpenSessionInfoResponse>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                // THIEU
                .build();
    }
}
