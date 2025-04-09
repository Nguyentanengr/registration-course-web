package com.jikateam.registration_course.service.session;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.dto.request.DeleteSessionListRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.entity.Session;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.OpenSessionRegistrationRepository;
import com.jikateam.registration_course.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeleteSessionService {

    private final SessionRepository sessionRepository;
    private final OpenSessionRegistrationRepository openSessionRegistrationRepository;

    public void deleteSession(Integer id) {

        Session session = sessionRepository.findSessionWithOpenSession(id)
                .orElseThrow(() -> new BusinessException(CodeResponse.DELETE_SESSION_SUCCESSFULLY));

        // Session chưa được mở bao giờ thì mới được xóa hoặc đưojc thêm vafo danh sach mo
        boolean canDelete = session.getOpenSessionRegistration() == null
                || session.getOpenSessionRegistration().getStatus() == RegistrationStatus.PENDING;

        if (!canDelete) throw new BusinessException(CodeResponse.SESSION_IS_CONFLICT);

        sessionRepository.delete(session);
    }

    @Transactional
    public void deleteSessionList(DeleteSessionListRequest request) {
        List<Session> sessions = sessionRepository
                .findAllSessionWithOpenSessionByIds(request.sessionIds());

        sessions.forEach(session -> {
            boolean canDelete = session.getOpenSessionRegistration() == null
                    || session.getOpenSessionRegistration().getStatus() == RegistrationStatus.PENDING;
            if (!canDelete) {
                log.info("Exist conflicted session: {}", session.getSessionId());
                throw new BusinessException(CodeResponse.SESSION_IS_CONFLICT);
            }
        });

        log.info("List session is deleted: {}", request.sessionIds());
        sessionRepository.deleteAllInBatch(sessions);
    }
}
