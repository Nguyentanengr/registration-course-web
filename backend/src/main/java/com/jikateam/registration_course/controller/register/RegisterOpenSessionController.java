package com.jikateam.registration_course.controller.register;


import com.jikateam.registration_course.controller.course.CourseController;
import com.jikateam.registration_course.dto.request.RegisterOpenSessionRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.service.register.RegisterOpenSessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = RegisterOpenSessionController.REGISTER_API_URL)
public class RegisterOpenSessionController {

    public static final String REGISTER_API_URL = "/api/v1/open-sessions/register";

    private final RegisterOpenSessionService registerOpenSessionService;

    @PostMapping
    public DataResponse<Void> register(
            @RequestBody @Valid RegisterOpenSessionRequest request
    ) {
        registerOpenSessionService.register(request);
        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<Void>builder()
                .code(codeResponse.getCode())
                .build();
    }
}
