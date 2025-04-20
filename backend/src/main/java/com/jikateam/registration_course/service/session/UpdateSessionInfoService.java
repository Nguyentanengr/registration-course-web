package com.jikateam.registration_course.service.session;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.converter.SessionConverter;
import com.jikateam.registration_course.dto.request.UpdateSessionInfoRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
import com.jikateam.registration_course.entity.*;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.ClassRepository;
import com.jikateam.registration_course.repository.CourseRepository;
import com.jikateam.registration_course.repository.OpenSessionRegistrationRepository;
import com.jikateam.registration_course.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UpdateSessionInfoService {

    private final SessionRepository sessionRepository;
    private final SessionConverter sessionConverter;
    private final OpenSessionRegistrationRepository openSessionRegistrationRepository;

    @Transactional
    public SessionInfoResponse update(UpdateSessionInfoRequest request, Integer sessionId) {

        Session session = sessionRepository.findSessionForUpdate(sessionId)
                .orElseThrow(() -> new BusinessException(CodeResponse.SESSION_NOT_FOUND));

        // can not update when sessionId is contained Open Session Registration
        boolean invalidStatus = openSessionRegistrationRepository.invalidUpdateStatus(sessionId);
        if (invalidStatus) throw new BusinessException(CodeResponse.SESSION_IS_CONFLICT);

        // check capacity on changed max student
        if (!request.maxStudents().equals(session.getMaxStudents())) {
            Set<Place> places = session.getSchedules().stream()
                    .map(Schedule::getPlace)
                    .collect(Collectors.toSet());
            validateCapacity(request, places);
        }

        sessionConverter.updateToSessionEntity(request, session);

        Session updatedSession = sessionRepository.save(session);
        RegistrationStatus status = sessionRepository.findStatusById(sessionId);
        log.info("Updated session: {}", updatedSession.getSessionId());
        log.info("Updated session detail: {}", updatedSession);

        return sessionConverter.mapToSessionInfoResponse(updatedSession, status);
    }

    private void validateCapacity(UpdateSessionInfoRequest request, Set<Place> places) {
        int capacity = places.stream()
                .mapToInt(Place::getPlaceCapacity)
                .min().orElse(0);
        if (request.maxStudents() > capacity) {
            throw new BusinessException(CodeResponse.DISSATISFIED_CAPACITY);
        }
    }

}
