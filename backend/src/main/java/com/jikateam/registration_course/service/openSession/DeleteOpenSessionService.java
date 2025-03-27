package com.jikateam.registration_course.service.openSession;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.dto.request.DeleteOpenSessionListRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.OpenSessionRegistrationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeleteOpenSessionService {


    private final OpenSessionRegistrationRepository openSessionRegistrationRepository;

    @Transactional
    public void deleteSingleOpenSession(Integer openSessionId) {

        Optional<OpenSessionRegistration> openSession = openSessionRegistrationRepository
                .findById(openSessionId);

        // Không có OpenSession với id thì khỏi làm gì cả.
        if (openSession.isEmpty()) return;

        // OpenSession phải có trạng thái là pending thì mới có thể xóa được
        if (openSession.get().getStatus() != RegistrationStatus.PENDING) {
            throw new BusinessException(CodeResponse.OPEN_SESSION_CANNOT_DELETE);
        }

        openSessionRegistrationRepository.delete(openSession.get());
        log.info("Deleted open session with id: {}", openSessionId);

    }

    @Transactional
    public void deleteBatchOpenSession(DeleteOpenSessionListRequest request) {

        List<Integer> openSessionIds = request.openSessionIds();

        // Kiểm tra xem có tồn tại open session nào có trạng thái không phải là pending không
        boolean isUnreadyToDelete = openSessionRegistrationRepository
                .existOpenSessionInListViolateStatus(openSessionIds, RegistrationStatus.PENDING);

        if (isUnreadyToDelete) {
            throw new BusinessException(CodeResponse.OPEN_SESSIONS_CANNOT_DELETE);
        }

        openSessionRegistrationRepository.deleteAllByIdInBatch(openSessionIds);

        log.info("Deleted open session list: {}", openSessionIds);
    }
}
