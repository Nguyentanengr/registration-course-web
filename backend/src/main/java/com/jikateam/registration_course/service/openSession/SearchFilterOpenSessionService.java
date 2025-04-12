package com.jikateam.registration_course.service.openSession;


import com.jikateam.registration_course.converter.OpenSessionConverter;
import com.jikateam.registration_course.dto.response.*;
import com.jikateam.registration_course.entity.CourseDependency;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import com.jikateam.registration_course.entity.RegistrationPhase;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.*;
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
    private final ClassRepository classRepository;
    private final CourseDependencyRepository courseDependencyRepository;
    private final RegistrationPhaseRepository phaseRepository;

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


    public List<ConformOpenSessionResponse> getAllBySemester
            (String searchKey, String classId, Integer year, Integer semester)
    {

        // Lọc ra các bản ghi theo đợt đăng ký và lớp sinh viên (join fetch)
        // Chỉ lấy các lớp với trạng thái confirm, teaching, completed (page Quản lý)
        List<OpenSessionRegistration> openSessions = openSessionRegistrationRepository
                .getAllBySemester(searchKey, classId, year, semester);

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
                        .mapToConformOpenSessionResponse(o
                                , countMap.getOrDefault(o.getOpenSessionRegistrationId(), 0L)))
                .toList();
    }

    public ListRegisterOpenSessionResponse getAllForRegister
            (Integer accountId, Integer filterType) {

        RegistrationPhase phase = null;

        var responseEntities = switch (filterType) {
            case 0 -> { // Trường hợp lọc theo lớp sinh viên có account id hiện tại
                // Tìm ra lớp của sinh viên hiện tại để lấy ra class Id, currentYear, currentSemester
                var clazz = classRepository.findByAccountId(accountId);

                // Tính toán ra nextYear và nextSemester cho học kì tiếp theo.
                var nextSemester = clazz.getCurrentSemester() == 1 ? 2
                        : clazz.getCurrentSemester() == 2 ? 3
                        : 1;
                var nextYear = clazz.getCurrentSemester() == 3 ? clazz.getStartYear() + clazz.getCurrentYear()
                        : clazz.getStartYear() + clazz.getCurrentYear() - 1;

                log.info("The next year and next semester for class {}: {}, {}"
                        , clazz.getClazzId(), nextYear, nextSemester);

                phase = phaseRepository.getOpenPhaseBySemester(nextYear, nextSemester, LocalDateTime.now());

                // Tìm các lớp học phần trong đợt đăng kí đang mở
                if (phase != null) {
                    log.info("Found phase registration: {}", phase.getRegistrationPhaseName());
                    log.info("Find session with clazzId and phaseId: {} {}", clazz.getClazzId(), phase.getRegistrationPhaseId());
                    yield openSessionRegistrationRepository
                            .getAllByFilterTypeClass(clazz.getClazzId(), phase.getRegistrationPhaseId());
                } else {
                    log.info("Not Found phase registration");
                    log.info("Find session with clazzId and year and semester: {} {} {}"
                            , clazz.getClazzId(), clazz.getCurrentYear() + clazz.getStartYear() - 1, clazz.getCurrentSemester());
                    yield openSessionRegistrationRepository
                            .getAllByFilterTypeClassInPrevPhase(clazz.getClazzId()
                                    , clazz.getCurrentYear() + clazz.getStartYear() - 1, clazz.getCurrentSemester());
                }
            }
            default -> throw new BusinessException(CodeResponse.INVALID_FILTER_TYPE);
        };

        // Tính isRegistered và empty

        log.info("List ResponseEntities {}", responseEntities.stream()
                .map(OpenSessionRegistration::getOpenSessionRegistrationId).toList());

        List<Integer> openSessionIds = responseEntities.stream()
                .map(OpenSessionRegistration::getOpenSessionRegistrationId).toList();

        // Lấy ra những lớp mà sinh viên đăng ký từ những lớp ở trên
        List<Integer> registered = enrollmentRepository.getIfRegistered(openSessionIds, accountId);
        log.info("Session id which student registered: {}", registered);

        // Lấy ra số lượng còn lại cho mỗi lớp ở trên
        List<Object[]> numberOfRegisterOnSessions = enrollmentRepository
                .getNumberOfRegisterOnOpenSessions(openSessionIds);

        // Chuyển sang map để dễ lấy ra số lượng đăng ký trên id
        Map<Integer, Long> countMap = numberOfRegisterOnSessions.stream() // map<openSessionId, count>
                .collect(Collectors.toMap(pair -> (Integer) pair[0], pair -> (Long) pair[1]));

        log.info("Quantity empty per open session: {}", countMap);

        // Lấy ra các danh sách môn
        List<String> courseIds = responseEntities.stream()
                .map((openSession) -> openSession.getSession().getCourse().getCourseId())
                .toList();

        // Lấy ra những môn mà sinh viên bị điều kiện tiên quyết
        List<String> prerequisites = courseDependencyRepository
                .getPrerequisites(courseIds, accountId);

        log.info("Disable course: {}", prerequisites);

        List<RegisterOpenSessionResponse> responses = responseEntities.stream()
                .map(o -> openSessionConverter.mapToRegisterSessionInfoResponse(o
                        , registered.contains(o.getOpenSessionRegistrationId())
                        , o.getSession().getMaxStudents() - countMap.getOrDefault(o.getOpenSessionRegistrationId(), 0L)
                        , !prerequisites.contains(o.getSession().getCourse().getCourseId())
                ))
                .toList();

        return ListRegisterOpenSessionResponse.builder()
                .startTime(phase != null ? phase.getOpenTime() : null)
                .endTime(phase != null ? phase.getCloseTime() : null)
                .openSessions(responses)
                .build();
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
