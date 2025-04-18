package com.jikateam.registration_course.controller.student;

import com.jikateam.registration_course.controller.session.SessionController;
import com.jikateam.registration_course.dto.response.*;
import com.jikateam.registration_course.service.student.StudentService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = StudentController.STUDENT_API_URL)
public class StudentController {

    public static final String STUDENT_API_URL = "/api/v1/students";

    private final StudentService studentService;

    @GetMapping("/by-session/{id}")
    public DataResponse<List<StudentRegisterResponse>> getListStudentBySessionId
            (@PathVariable("id") Integer openSessionId) {

        List<StudentRegisterResponse> responses =
                studentService.getAllStudentByOpenSessionId(openSessionId);

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<StudentRegisterResponse>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();

    }

    @GetMapping("/account/{id}")
    public DataResponse<StudentInfoResponse> getStudentInfoByAccountId(
            @PathVariable("id") Integer accountId
    ) {
        var response = studentService.getByAccountId(accountId);

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<StudentInfoResponse>builder()
                .code(codeResponse.getCode())
                .data(response)
                .build();
    }
}
