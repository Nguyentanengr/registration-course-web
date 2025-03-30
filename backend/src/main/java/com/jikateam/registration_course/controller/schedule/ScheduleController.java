package com.jikateam.registration_course.controller.schedule;


import com.jikateam.registration_course.controller.session.SessionController;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.SchedulesOnWeekResponse;
import com.jikateam.registration_course.service.schedule.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = ScheduleController.SCHEDULE_API_URL)
public class ScheduleController {

    public static final String SCHEDULE_API_URL = "/api/v1/schedules";

    private final ScheduleService scheduleService;

    @GetMapping
    public DataResponse<List<SchedulesOnWeekResponse>> getSchedulesOnWeek(
            @RequestParam String studentId,
            @RequestParam Integer semester, // 2
            @RequestParam Integer year // 2024

    ) {

        var response = scheduleService.getSchedulesOnWeek(studentId, semester, year);

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<SchedulesOnWeekResponse>>builder()
                .code(codeResponse.getCode())
                .data(response)
                .build();
    }
}
