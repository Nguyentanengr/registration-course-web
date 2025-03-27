package com.jikateam.registration_course.service.openSession;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import com.jikateam.registration_course.repository.OpenSessionRegistrationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenSessionSchedulerService {

    private final OpenSessionRegistrationRepository openSessionRepository;

    @Scheduled(cron = "0 * * * * *") // Chạy sau khi phút mới bắt đầu (0 giây)
    @Transactional
    public void updateOpenSessionStatuses() {

        LocalDateTime now = LocalDateTime.now();

        // 1. Mở các lớp đang chờ
        List<OpenSessionRegistration> pendingSessions = openSessionRepository
                .findPendingSessionsToOpen(now);

        if (!pendingSessions.isEmpty()) {
            List<Integer> pendingIds = pendingSessions.stream()
                    .map(OpenSessionRegistration::getOpenSessionRegistrationId)
                    .toList();
            openSessionRepository.updateStatusByIds(pendingIds, RegistrationStatus.OPEN);
            log.info("Opened {} sessions", pendingIds.size());

        }

        // 2. Đóng các lớp đã mở

        List<OpenSessionRegistration> openingSessions = openSessionRepository
                .findOpeningSessionsToClose(now);

        if (!openingSessions.isEmpty()) {
            List<Integer> openingIds = openingSessions.stream()
                    .map(OpenSessionRegistration::getOpenSessionRegistrationId)
                    .toList();
            openSessionRepository.updateStatusByIds(openingIds, RegistrationStatus.CLOSE);
            log.info("Closed {} sessions", openingIds.size());

        }

    }

}
