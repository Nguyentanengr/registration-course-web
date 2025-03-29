package com.jikateam.registration_course.service.register;

import com.jikateam.registration_course.constant.EnrollmentStatus;
import com.jikateam.registration_course.dto.request.RegisterOpenSessionRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegisterOpenSessionService {

    private final EnrollmentRepository enrollmentRepository;

    public void register(RegisterOpenSessionRequest request) {

        String message = request.status() == EnrollmentStatus.ENROLLED
                ? enrollmentRepository.register(request.openSessionId(), request.studentId())
                : enrollmentRepository.cancel(request.openSessionId(), request.studentId());

        String logAction = request.status() == EnrollmentStatus.ENROLLED ? "Register" : "Cancel";
        if (!Objects.equals(message, "SUCCESSFUL")) {
            log.info("{} session not successfully cause: {}", logAction, message);
            CodeResponse codeResponse = CodeResponse.valueOf(message);
            throw new BusinessException(codeResponse);
        }

        log.info("{} session successfully", logAction);
    }
}
