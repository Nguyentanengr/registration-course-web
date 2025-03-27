package com.jikateam.registration_course.service.openSession;

import com.jikateam.registration_course.dto.request.UpdateStatusOpenSessionRequest;
import com.jikateam.registration_course.dto.response.OpenSessionInfoResponse;
import com.jikateam.registration_course.repository.OpenSessionRegistrationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UpdateStatusOpenSessionService {


    private final OpenSessionRegistrationRepository openSessionRegistrationRepository;


    public OpenSessionInfoResponse confirmOpenSession
            (Integer openSessionId, UpdateStatusOpenSessionRequest request) {



        return null;
    }

}
