package com.jikateam.registration_course.service.openSession;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.converter.OpenSessionConverter;
import com.jikateam.registration_course.dto.request.UpdateSingleStatusOpenSessionRequest;
import com.jikateam.registration_course.dto.request.UpdateStatusOpenSessionListRequest;
import com.jikateam.registration_course.dto.request.UpdateStatusOpenSessionRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.OpenSessionInfoResponse;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.EnrollmentRepository;
import com.jikateam.registration_course.repository.OpenSessionRegistrationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UpdateStatusOpenSessionService {


    private final OpenSessionRegistrationRepository openSessionRegistrationRepository;
    private final OpenSessionConverter openSessionConverter;
    private final EnrollmentRepository enrollmentRepository;

    public OpenSessionInfoResponse confirmOpenSession
            (Integer openSessionId, UpdateStatusOpenSessionRequest request) {

        var openSessionEntity = openSessionRegistrationRepository.findById(openSessionId)
                .orElseThrow(() -> new BusinessException(CodeResponse.OPEN_SESSION_NOT_FOUND));

        log.info("Status session: {}", openSessionEntity.getStatus());

        // Chỉ được phép xác nhận hoặc hủy khi đã đóng đăng ký.
        if (openSessionEntity.getStatus() == RegistrationStatus.CLOSE) {
            openSessionEntity.setStatus(request.status());
            openSessionRegistrationRepository.save(openSessionEntity);
        } else {
            throw new BusinessException(CodeResponse.INVALID_PREVIOUS_STATUS);
        }

        List<Object[]> count = enrollmentRepository.getNumberOfRegisterOnOpenSessions(List.of(openSessionId));

        return openSessionConverter.mapToNewOpenSessionInfoResponse(openSessionEntity
                , count.isEmpty() ? 0L : (Long) count.get(0)[1]);
    }

    public List<OpenSessionInfoResponse> confirmOpenSessionList (
            UpdateStatusOpenSessionListRequest request
    ) {
        Map<Integer, RegistrationStatus> openSessionRequests = request.openSessions().stream()
                .collect(Collectors.toMap(r -> r.openSessionId(), r -> r.status()));

        var openSessionEntities = openSessionRegistrationRepository
                .findAllById(openSessionRequests.keySet());

        // Không cập nhật nếu không tồn tại một bản ghi nào đó
        if (openSessionEntities.size() != openSessionRequests.size()) {
            throw new BusinessException(CodeResponse.OPEN_SESSION_NOT_FOUND);
        }

        // Kiểm tra xem trạng thái của từng lớp học phần có hợp lệ không

        openSessionEntities.forEach((o) -> {
            if (o.getStatus() != RegistrationStatus.CLOSE) {
                throw new BusinessException(CodeResponse.INVALID_PREVIOUS_STATUS);
            } else {
                o.setStatus(openSessionRequests.get(o.getOpenSessionRegistrationId()));
            }
        });

        // lấy số lượng đăng ký
        List<Object[]> count = enrollmentRepository
                .getNumberOfRegisterOnOpenSessions(openSessionRequests.keySet());

        Map<Integer, Long> countMap = count.stream() // map<openSessionId, count>
                .collect(Collectors.toMap(pair -> (Integer) pair[0], pair -> (Long) pair[1]));


        // Lưu tất cả.

        var savedEntities = openSessionRegistrationRepository.saveAll(openSessionEntities);

        return savedEntities.stream()
                .map(se -> {
                    return openSessionConverter.mapToNewOpenSessionInfoResponse(se
                            , countMap.getOrDefault(se.getOpenSessionRegistrationId(), 0L));
                })
                .toList();

    }


    public void revertStatus
            (Integer openSessionId) {

        var openSessionEntity = openSessionRegistrationRepository.findById(openSessionId)
                .orElseThrow(() -> new BusinessException(CodeResponse.OPEN_SESSION_NOT_FOUND));

        log.info("Status session: {}", openSessionEntity.getStatus());

        // Chỉ được phép thu hồi đăng ký khi pending (chưa mở) -> Xóa khỏi bảng openSession
        if (openSessionEntity.getStatus() == RegistrationStatus.PENDING) {
            openSessionRegistrationRepository.delete(openSessionEntity);
        } else {
            throw new BusinessException(CodeResponse.INVALID_PREVIOUS_STATUS);
        }
    }

}
