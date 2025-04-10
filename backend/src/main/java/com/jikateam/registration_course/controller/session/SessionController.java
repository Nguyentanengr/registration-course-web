package com.jikateam.registration_course.controller.session;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.dto.request.*;
import com.jikateam.registration_course.dto.response.*;
import com.jikateam.registration_course.service.session.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = SessionController.SESSION_API_URL)
public class SessionController {

    public static final String SESSION_API_URL = "/api/v1/sessions";

    private final CreateSingleSessionService createSingleSessionService;
    private final UpdateSessionInfoService updateSessionInfoService;
    private final DeleteSessionService deleteSessionService;
    private final UpdateScheduleService updateScheduleService;
    private final SearchFilterSessionService searchFilterSessionService;
    private final FilterAbleOpenSessionService filterAbleOpenSessionService;

    @GetMapping
    public DataResponse<PageSessionInfoResponse> getAllSessions(
            @RequestParam(defaultValue = "") String searchKey,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer semester,
            @RequestParam(required = false) String classId,
            @RequestParam(required = false) String courseId,
            @RequestParam(required = false) Integer status, // 0
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String fieldSorted,
            @RequestParam(required = false) String sorter
    ) {

        Map<String, String> mapFieldSorted = new HashMap<>();
        mapFieldSorted.put("classId", "clazz.clazzId");
        mapFieldSorted.put("courseId", "course.courseId");
        mapFieldSorted.put("year", "year");
        mapFieldSorted.put("sessionId", "sessionId");
        mapFieldSorted.put("semester", "semester");

        String convertFieldSorted = mapFieldSorted.get(fieldSorted) == null
                ? mapFieldSorted.get("sessionId")
                : mapFieldSorted.get(fieldSorted);

        String convertSorter = sorter != null
                && sorter.equalsIgnoreCase("desc") ? "desc" : "asc";

        SessionFilterRequest request = SessionFilterRequest.builder()
                .searchKey(searchKey)
                .year(year)
                .semester(semester)
                .clazzId(classId)
                .courseId(courseId)
                .page(page)
                .size(size)
                .fieldSorted(convertFieldSorted)
                .sorter(convertSorter)
                .build();

        PageRequest pageRequest = PageRequest.of(request.page(), request.size()
                , request.sorter().equals("asc")
                        ? Sort.by(request.fieldSorted()).ascending()
                        : Sort.by(request.fieldSorted()).descending()
        );

        log.info("Param: {}, status = {}", request, status);
        CodeResponse codeResponse = CodeResponse.SUCCESS;

        return DataResponse.<PageSessionInfoResponse>builder()
                .code(codeResponse.getCode())
                .data(searchFilterSessionService.getAllSession(request, status, pageRequest))
                .build();
    }

    @GetMapping("/able-open")
    public DataResponse<List<SessionInfoResponse>> getAbleSessionByFilter(
            @RequestParam(defaultValue = "") String searchKey,
            @RequestParam(defaultValue = "") String classId,
            @RequestParam Integer year,
            @RequestParam Integer semester
    ) {

        List<SessionInfoResponse> responses = filterAbleOpenSessionService
                .getAbleOpenSessionByFilter(searchKey, year, semester, classId);

        log.info("Response for searchKey = {}, classId = {}, year = {}, semester = {}: {}",
                searchKey, classId, year, semester, responses.stream().map(SessionInfoResponse::sessionId).toList());

        CodeResponse codeResponse = CodeResponse.SUCCESS;

        return DataResponse.<List<SessionInfoResponse>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();
    }

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
            (@PathVariable("id") Integer sessionId, @RequestBody @Valid UpdateSchedulesRequest request) {

        SchedulesOnSessionResponse response = updateScheduleService.updateSchedule(request, sessionId);
        CodeResponse codeResponse = CodeResponse.UPDATE_SESSION_SUCCESSFULLY;
        return DataResponse.<SchedulesOnSessionResponse>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(response)
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
