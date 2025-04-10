package com.jikateam.registration_course.service.session;


import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.converter.SessionConverter;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
import com.jikateam.registration_course.entity.Clazz;
import com.jikateam.registration_course.entity.RegistrationPhase;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.ClassRepository;
import com.jikateam.registration_course.repository.PhaseRepository;
import com.jikateam.registration_course.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FilterAbleOpenSessionService {

    private final SessionRepository sessionRepository;
    private final SessionConverter sessionConverter;
    private final ClassRepository classRepository;
    private final PhaseRepository phaseRepository;

    public List<SessionInfoResponse> getAbleOpenSessionByFilter
            (String searchKey, Integer year, Integer semester, String clazzId) {

        log.info("Finding sessions with semester: {}, year: {}, classId: {}", semester, year, clazzId);

        return sessionRepository.findAllAbleSessionByFilter(searchKey, year, semester, clazzId)
                .stream().map(session -> {
                    RegistrationStatus rs = session.getOpenSessionRegistration() != null
                            ? session.getOpenSessionRegistration().getStatus()
                            : null;
                    return sessionConverter.mapToSessionInfoResponse(session
                            , rs);
                }).toList();
    }
}
