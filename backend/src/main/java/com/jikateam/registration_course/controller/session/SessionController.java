package com.jikateam.registration_course.controller.session;

import com.jikateam.registration_course.constant.SessionStatus;
import com.jikateam.registration_course.dto.request.*;
import com.jikateam.registration_course.dto.response.*;
import com.jikateam.registration_course.service.session.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

    @GetMapping
    public DataResponse<PageSessionInfoResponse> getAllSessions(
            @RequestParam(defaultValue = "") String searchKey,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer semester,
            @RequestParam(required = false) String classId,
            @RequestParam(required = false) String courseId,
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String fieldSorted,
            @RequestParam(required = false) String sorter
    ) {

        Map<String, String> mapFieldSorted = new HashMap<>();
        mapFieldSorted.put("classId", "clazz.clazzId");
        mapFieldSorted.put("courseId", "course.courseId");
        mapFieldSorted.put("year", "year");
        mapFieldSorted.put("semester", "semester");

        String convertFieldSorted = mapFieldSorted.get(fieldSorted) == null
                ? mapFieldSorted.get("classId")
                : mapFieldSorted.get(fieldSorted);

        SessionStatus convertStatus = status == null ? null
                : status == 0 ? SessionStatus.PENDING
                : status == 1 ? SessionStatus.TEACHING
                : status == 2 ? SessionStatus.COMPLETED
                : null;

        String convertSorter = sorter != null
                && sorter.equalsIgnoreCase("desc") ? "desc" : "asc";

        SessionFilterRequest request = SessionFilterRequest.builder()
                .searchKey(searchKey)
                .year(year)
                .semester(semester)
                .clazzId(classId)
                .courseId(courseId)
                .status(convertStatus)
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

        log.info("Param: {}", request);
        CodeResponse codeResponse = CodeResponse.SUCCESS;

        return DataResponse.<PageSessionInfoResponse>builder()
                .code(codeResponse.getCode())
                .data(searchFilterSessionService.getAllSession(request, pageRequest))
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
