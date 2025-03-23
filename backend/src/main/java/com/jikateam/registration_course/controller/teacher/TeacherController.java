package com.jikateam.registration_course.controller.teacher;


import com.jikateam.registration_course.constant.TeacherStatus;
import com.jikateam.registration_course.controller.place.PlaceController;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.PlaceResponse;
import com.jikateam.registration_course.dto.response.TeacherInfoResponse;
import com.jikateam.registration_course.service.teacher.TeacherService;
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
@RequestMapping(value = TeacherController.SESSION_API_URL)
public class TeacherController {


    public static final String SESSION_API_URL = "/api/v1/teachers";
    private final TeacherService teacherService;

    @GetMapping
    public DataResponse<List<TeacherInfoResponse>> getAllTeachers(
            @RequestParam(required = false) String courseId,
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "") String searchKey
    ) {

        // convert status
        TeacherStatus convertStatus = status == null ? null
                : status == 0 ? TeacherStatus.ACTIVE
                : status == 1 ? TeacherStatus.ON_LIVE
                : status == 2 ? TeacherStatus.RESIGNED
                : null;


        List<TeacherInfoResponse> responses = teacherService
                .getAllTeachers(searchKey, courseId, convertStatus);

        log.info("Response for searchKey={}, courseId={}, status={}: {}"
                , searchKey, courseId, convertStatus
                , responses.stream().map(TeacherInfoResponse::teacherId));

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<TeacherInfoResponse>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();

    }
}
