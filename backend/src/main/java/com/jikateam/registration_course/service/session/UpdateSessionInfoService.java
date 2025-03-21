package com.jikateam.registration_course.service.session;

import com.jikateam.registration_course.constant.SessionStatus;
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
    private final ClassRepository classRepository;
    private final CourseRepository courseRepository;
    private final SessionConverter sessionConverter;
    private final OpenSessionRegistrationRepository openSessionRegistrationRepository;

    @Transactional
    public SessionInfoResponse update(UpdateSessionInfoRequest request, Integer sessionId) {

        Session session = sessionRepository.findSessionForUpdate(sessionId)
                .orElseThrow(() -> new BusinessException(CodeResponse.SESSION_NOT_FOUND));

        // can not update when status != 'pending' and session is opening
        // (it mean sessionId is contained Open Session Registration)
        boolean isOpening = openSessionRegistrationRepository.existBySession(sessionId)
                || session.getStatus() != SessionStatus.PENDING;
        if (isOpening) throw new BusinessException(CodeResponse.SESSION_IS_CONFLICT);


        // check if class is changed or not (same course)
        String oldClazzId = session.getClazz().getClazzId();
        String newClazzId = request.clazzId();
        String oldCourseId = session.getCourse().getCourseId();
        String newCourseId = request.courseId();

        Clazz clazz = oldClazzId.equals(newClazzId)
                ? null
                : classRepository.findById(newClazzId)
                . orElseThrow(() -> new BusinessException(CodeResponse.CLASS_NOT_FOUND));

        Course course = oldCourseId.equals(newCourseId)
                ? null
                : courseRepository.findById(newCourseId)
                . orElseThrow(() -> new BusinessException(CodeResponse.COURSE_NOT_FOUND));

        if (clazz != null) log.info("Class is changed: {}", clazz.getSessions());
        if (course != null) log.info("Course is changed: {}", course.getCourseId());

        // check capacity on changed max student
        if (!request.maxStudents().equals(session.getMaxStudents())) {
            Set<Place> places = session.getSchedules().stream()
                    .map(Schedule::getPlace)
                    .collect(Collectors.toSet());
            validateCapacity(request, places);
        }

        // check teacher on changed course.
        if (!request.courseId().equals(session.getCourse().getCourseId())) {
            Set<Teacher> teachers = session.getSchedules().stream()
                    .map(Schedule::getTeacher)
                    .collect(Collectors.toSet());
            validateTeacher(request, teachers);
        }

        sessionConverter.updateToSessionEntity(request, session);
        if (clazz != null) session.setClazz(clazz);
        if (course != null) session.setCourse(course);

        Session updatedSession = sessionRepository.save(session);
        log.info("Updated session: {}", updatedSession.getSessionId());
        log.info("Updated session detail: {}", updatedSession);

        return sessionConverter.mapToSessionInfoResponse(updatedSession);
    }

    private void validateCapacity(UpdateSessionInfoRequest request, Set<Place> places) {
        int capacity = places.stream()
                .mapToInt(Place::getPlaceCapacity)
                .min().orElse(0);
        if (request.maxStudents() > capacity) {
            throw new BusinessException(CodeResponse.DISSATISFIED_CAPACITY);
        }
    }

    private void validateTeacher(UpdateSessionInfoRequest request, Set<Teacher> teachers) {
        // kiem tra xem teacher co dang ky day mon hoc vua duoc thay doi khong
        teachers.forEach(teacher -> {
            boolean isRegister = teacher.getCourses().stream()
                    .map(Course::getCourseId)
                    .anyMatch(courseId -> courseId.equals(request.courseId()));

            if (!isRegister) throw new BusinessException(CodeResponse.DISSATISFIED_TEACHER);
        });
    }
}
