package com.jikateam.registration_course.controller.clazz;

import com.jikateam.registration_course.dto.response.ClazzInfoResponse;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.service.clazz.ClazzService;
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
@RequestMapping(value = ClazzController.CLASS_API_URL)
public class ClazzController {

    public static final String CLASS_API_URL = "/api/v1/classes";

    private final ClazzService clazzService;

    @GetMapping
    public DataResponse<List<ClazzInfoResponse>> getAllClazzByFilter(
            @RequestParam(defaultValue = "") String searchKey,
            @RequestParam(required = false) Integer year
    ) {


        List<ClazzInfoResponse> responses = clazzService.getAllByFilter(searchKey, year);

        log.info("Response for searchKey={}, year={}: {}"
                , searchKey, year, responses.stream().map(ClazzInfoResponse::clazzId));

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<ClazzInfoResponse>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();
    }

    @GetMapping("/active")
    public DataResponse<List<String>> getAllClazzIdActive(
    ) {


        List<String> responses = clazzService.getAllClazzIdActive();

        log.info("Response: {}", responses);

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<String>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();
    }

}
