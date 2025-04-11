package com.jikateam.registration_course.service.openSession;


import com.jikateam.registration_course.converter.OpenSessionConverter;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.OpenSessionInfoResponse;
import com.jikateam.registration_course.dto.response.RegisterOpenSessionResponse;
import com.jikateam.registration_course.dto.response.RegisteredByStudentResponse;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.EnrollmentRepository;
import com.jikateam.registration_course.repository.OpenSessionRegistrationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchFilterOpenSessionService {

    private final OpenSessionRegistrationRepository openSessionRegistrationRepository;
    private final OpenSessionConverter openSessionConverter;
    private final EnrollmentRepository enrollmentRepository;

    public List<OpenSessionInfoResponse> getAllByPhaseAndClass
            (String searchKey, Integer phaseId, String clazzId) {

        // Lọc ra các bản ghi theo đợt đăng ký và lớp sinh viên (join fetch)
        // Chỉ lấy các lớp với trạng thái chờ / mở / đóng (page Quản lý)
        List<OpenSessionRegistration> openSessions = openSessionRegistrationRepository
                .getAllByPhaseAndClass(searchKey, phaseId, clazzId);


        // Tiếp tục truy vấn để lấy ra số lượng sinh viên đăng ký trên từng lớp học phần được mở
        List<Integer> openSessionIds = openSessions.stream()
                .map(OpenSessionRegistration::getOpenSessionRegistrationId).toList();

        List<Object[]> numberOfRegisterOnSessions = enrollmentRepository
                .getNumberOfRegisterOnOpenSessions(openSessionIds);

        // Chuyển sang map để dễ lấy ra số lượng đăng ký trên id
        Map<Integer, Long> countMap = numberOfRegisterOnSessions.stream() // map<openSessionId, count>
                .collect(Collectors.toMap(pair -> (Integer) pair[0], pair -> (Long) pair[1]));

        log.info("Response for number of register on session: {}", numberOfRegisterOnSessions);

        return openSessions.stream()
                .map(o -> openSessionConverter
                        .mapToNewOpenSessionInfoResponse(o
                                , countMap.getOrDefault(o.getOpenSessionRegistrationId(), 0L)))
                .toList();
    }

    public List<RegisterOpenSessionResponse> getAllForRegister
            (Integer phaseId, String studentId, String clazzId, Integer filterType) {

        var responseEntities = switch (filterType) {
            case 0 -> { // Trường hợp lọc theo lớp sinh viên có clazzId
                yield  openSessionRegistrationRepository.getAllByFilterTypeClass(clazzId, phaseId);
            }
            case 1 -> {
                yield openSessionRegistrationRepository.getAllByFilterTypeEduProgram(clazzId, phaseId);
            }
            case 2 -> {
                yield openSessionRegistrationRepository.getAllByFilterTypeCourseNotPassed(studentId, phaseId);
            }
            default -> throw new BusinessException(CodeResponse.INVALID_FILTER_TYPE);
        };

        // Tính isRegistered và empty

        List<Integer> openSessionIds = responseEntities.stream()
                .map(OpenSessionRegistration::getOpenSessionRegistrationId).toList();

        // Lấy ra những lớp mà sinh viên đăng ký từ những lớp ở trên
        List<Integer> registered = enrollmentRepository.getIfRegistered(openSessionIds, studentId);

        // Lấy ra số lượng còn lại cho mỗi lớp ở trên
        List<Object[]> numberOfRegisterOnSessions = enrollmentRepository
                .getNumberOfRegisterOnOpenSessions(openSessionIds);

        // Chuyển sang map để dễ lấy ra số lượng đăng ký trên id
        Map<Integer, Long> countMap = numberOfRegisterOnSessions.stream() // map<openSessionId, count>
                .collect(Collectors.toMap(pair -> (Integer) pair[0], pair -> (Long) pair[1]));

        return responseEntities.stream()
                .map(o -> openSessionConverter.mapToRegisterSessionInfoResponse(o
                        , registered.contains(o.getOpenSessionRegistrationId())
                        , countMap.getOrDefault(o.getOpenSessionRegistrationId(), 0L)))
                .toList();
    }


    public List<RegisteredByStudentResponse> getAllIsRegisteredByStudent
            (Integer phaseId, String studentId) {

        // Lấy danh sách các lớp học phần được đăng ký bởi sinh viên trong giai đoạn hiện tại
        List<Object[]> responses = openSessionRegistrationRepository
                .getAllIsRegisteredByStudentId(phaseId, studentId); // List<[openSession, registerAt]>


        log.info("Number of openSession is registered by student with id = {}: {}"
                , studentId, responses.size());

        List<RegisteredByStudentResponse> registered =  responses.stream().map(pair -> {
            var openSession = (OpenSessionRegistration) pair[0];
            var registerAt = (LocalDateTime) pair[1];

            return openSessionConverter.mapToRegisteredByStudentResponse(openSession, registerAt);
        }).toList();

        // Lọc trùng lặp do fetch eager
        Set<Integer> set = new HashSet<>();

        return registered.stream().filter(r -> {
            if (r != null && !set.contains(r.openSessionId())) {
                set.add(r.openSessionId());
                return true;
            }
            return false;
        }).toList();
    }

}
