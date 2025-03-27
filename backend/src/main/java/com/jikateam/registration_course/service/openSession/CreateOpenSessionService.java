package com.jikateam.registration_course.service.openSession;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.converter.OpenSessionConverter;
import com.jikateam.registration_course.dto.request.CreateOpenSessionListRequest;
import com.jikateam.registration_course.dto.request.OpenSessionRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.OpenSessionInfoResponse;
import com.jikateam.registration_course.entity.Manager;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import com.jikateam.registration_course.entity.RegistrationPhase;
import com.jikateam.registration_course.entity.Session;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.ManagerRepository;
import com.jikateam.registration_course.repository.OpenSessionRegistrationRepository;
import com.jikateam.registration_course.repository.PhaseRepository;
import com.jikateam.registration_course.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreateOpenSessionService {

    private final SessionRepository sessionRepository;
    private final PhaseRepository phaseRepository;
    private final ManagerRepository managerRepository;
    private final OpenSessionRegistrationRepository openSessionRegistrationRepository;
    private final OpenSessionConverter openSessionConverter;

    @Transactional

    public List<OpenSessionInfoResponse> createList(CreateOpenSessionListRequest request) {
        List<OpenSessionRequest> openSessionRequests = request.openSessions();

        Set<Integer> sessionIds = openSessionRequests.stream()
                .map(OpenSessionRequest::sessionId)
                .collect(Collectors.toSet());
        Set<Integer> phaseIds = openSessionRequests.stream()
                .map(OpenSessionRequest::registrationPhaseId)
                .collect(Collectors.toSet());
        Set<String> managerIds = openSessionRequests.stream()
                .map(OpenSessionRequest::managerId)
                .collect(Collectors.toSet());

        // Tải trước dữ liệu kèm điều kiện
        Map<Integer, Session> sessionMap = sessionRepository.findAllInvalidSessionToOpenByIds(sessionIds).stream()
                .collect(Collectors.toMap(Session::getSessionId, s -> s));
        Map<Integer, RegistrationPhase> phaseMap = phaseRepository.findAllInvalidPhaseToOpen(phaseIds).stream()
                .collect(Collectors.toMap(RegistrationPhase::getRegistrationPhaseId, p -> p));
        Map<String, Manager> managerMap = managerRepository.findAllActiveManagerByIds(managerIds).stream()
                .collect(Collectors.toMap(Manager::getManagerId, m -> m));

        // kiểm tra lại nếu không thỏa mãn điều kiện
        if (sessionMap.size() != sessionIds.size()) {
            log.info("Invalid sessions: {}", sessionIds.stream().filter(id -> !sessionMap.containsKey(id)).toList());
            throw new BusinessException(CodeResponse.INVALID_SESSION_TO_OPEN);
        }
        if (phaseMap.size() != phaseIds.size()) {
            log.info("Invalid phases: {}", phaseIds.stream().filter(id -> !phaseMap.containsKey(id)).toList());
            throw new BusinessException(CodeResponse.INVALID_PHASE_TO_OPEN);
        }
        if (managerMap.size() != managerIds.size()) {
            log.info("Invalid managers: {}", managerIds.stream().filter(id -> !managerMap.containsKey(id)).toList());
            throw new BusinessException(CodeResponse.INVALID_MANAGER_TO_OPEN);
        }

        // đổi từ request sang entity
        List<OpenSessionRegistration> openSessions = openSessionRequests.stream()
                .map(req -> {
                    OpenSessionRegistration o = OpenSessionRegistration.builder()
                            .manager(managerMap.get(req.managerId()))
                            .session(sessionMap.get(req.sessionId()))
                            .registrationPhase(phaseMap.get(req.registrationPhaseId()))
                            .status(RegistrationStatus.PENDING)
                            .createdAt(LocalDateTime.now())
                            .build();
                    return o;
                }).toList();

        List<OpenSessionRegistration> savedOpenSessions = openSessionRegistrationRepository
                .saveAll(openSessions); // save batch

        log.info("Saved open sessions: {}", savedOpenSessions.stream().map(OpenSessionRegistration::getOpenSessionRegistrationId));

        // trả về với record
        return savedOpenSessions.stream().map(openSession ->
            openSessionConverter.mapToNewOpenSessionInfoResponse(openSession, 0L)
        ).toList();
    }
}
