package com.jikateam.registration_course.controller.test;

import com.jikateam.registration_course.controller.teacher.TeacherController;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class GetBcryptPasswordController {

    private final PasswordEncoder passwordEncoder;
    @PostMapping(value = "/api/v1/auth/gen-pass")
    public DataResponse<List<String>> getBcryptPass(@RequestBody List<String> orgPasswords) {

        var encPasswords = orgPasswords.stream().map(passwordEncoder::encode).toList();

        var codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<String>>builder()
                .code(codeResponse.getCode())
                .data(encPasswords)
                .build();
    }
}
