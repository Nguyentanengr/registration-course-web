package com.jikateam.registration_course.controller.openSession;


import com.jikateam.registration_course.dto.request.CreateOpenSessionListRequest;
import com.jikateam.registration_course.dto.request.DeleteOpenSessionListRequest;
import com.jikateam.registration_course.dto.request.UpdateStatusOpenSessionListRequest;
import com.jikateam.registration_course.dto.request.UpdateStatusOpenSessionRequest;
import com.jikateam.registration_course.dto.response.*;
import com.jikateam.registration_course.service.openSession.CreateOpenSessionService;
import com.jikateam.registration_course.service.openSession.DeleteOpenSessionService;
import com.jikateam.registration_course.service.openSession.SearchFilterOpenSessionService;
import com.jikateam.registration_course.service.openSession.UpdateStatusOpenSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private final UpdateStatusOpenSessionService updateStatusOpenSessionService;

    @GetMapping
    public DataResponse<List<OpenSessionInfoResponse>> getAllOpenSessionByPhaseAndClass(
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

    @GetMapping("/conform")
    public DataResponse<List<ConformOpenSessionResponse>> getAllOpenSessionBySemester(
            @RequestParam(defaultValue = "") String searchKey,
            @RequestParam(required = false) String classId,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer semester
    ) {

        List<ConformOpenSessionResponse> responses = searchFilterOpenSessionService
                .getAllBySemester(searchKey, classId, year, semester);

        log.info("Response conform open session for params searchKey: " +
                "{}, year: {}, semester: {}, classId: {}: {}",
                searchKey, year, semester, classId, responses);

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<ConformOpenSessionResponse>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();
    }


    @GetMapping("/for-register")
    public DataResponse<ListRegisterOpenSessionResponse> getAllOpenSessionForRegister(
            @RequestParam Integer accountId,
            @RequestParam Integer filterType // 0: class | 1 : CTDT | 2 : pass
    ) {

        CodeResponse codeResponse = CodeResponse.SUCCESS;

        if (filterType < 0 || filterType > 2) {
            return DataResponse.<ListRegisterOpenSessionResponse>builder()
                    .code(codeResponse.getCode())
                    .data(null)
                    .build();
        }

        var responses = searchFilterOpenSessionService.getAllForRegister(accountId, filterType);


        return DataResponse.<ListRegisterOpenSessionResponse>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();

    }

    @GetMapping("/by-student")
    public DataResponse<List<RegisteredByStudentResponse>> getRegisteredOpenSessionByStudent(
            @RequestParam Integer phaseId,
            @RequestParam String studentId
    ) {
        CodeResponse codeResponse = CodeResponse.SUCCESS;

        var response = searchFilterOpenSessionService.getAllIsRegisteredByStudent(phaseId, studentId);

        return DataResponse.<List<RegisteredByStudentResponse>>builder()
                .code(codeResponse.getCode())
                .data(response)
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

    @PutMapping("/{id}")
    public DataResponse<OpenSessionInfoResponse> ConfirmOpenSession(
            @PathVariable("id") Integer openSessionId,
            @RequestBody UpdateStatusOpenSessionRequest request
    ) {

        var response = updateStatusOpenSessionService.confirmOpenSession(openSessionId, request);

        CodeResponse codeResponse = CodeResponse.UPDATE_OPEN_SESSION_STATUS_SUCCESSFULLY;
        return DataResponse.<OpenSessionInfoResponse>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(response)
                .build();
    }

    @PutMapping("/batch")
    public DataResponse<List<OpenSessionInfoResponse>> ConfirmOpenSession(
            @RequestBody UpdateStatusOpenSessionListRequest request
    ) {

        var response = updateStatusOpenSessionService.confirmOpenSessionList(request);

        CodeResponse codeResponse = CodeResponse.UPDATE_OPEN_SESSION_STATUS_SUCCESSFULLY;
        return DataResponse.<List<OpenSessionInfoResponse>>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(response)
                .build();
    }

    @DeleteMapping("/revert/{id}")
    public DataResponse<Void> revertStatusPending(
            @PathVariable("id") Integer openSessionId
    ) {

        updateStatusOpenSessionService.revertStatus(openSessionId);

        CodeResponse codeResponse = CodeResponse.UPDATE_OPEN_SESSION_STATUS_SUCCESSFULLY;
        return DataResponse.<Void>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .build();
    }

}
