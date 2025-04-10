package com.jikateam.registration_course.service.session;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.converter.ScheduleConverter;
import com.jikateam.registration_course.converter.SessionConverter;
import com.jikateam.registration_course.dto.request.CreateSessionRequest;
import com.jikateam.registration_course.dto.request.ScheduleRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
import com.jikateam.registration_course.entity.*;
import com.jikateam.registration_course.entity.Clazz;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreateSingleSessionService {

    private final SessionRepository sessionRepository;
    private final ScheduleRepository scheduleRepository;
    private final ClassRepository classRepository;
    private final CourseRepository courseRepository;
    private final PlaceRepository placeRepository;
    private final TeacherRepository teacherRepository;
    private final SessionConverter sessionConverter;
    private final ScheduleConverter scheduleConverter;
    private final StudyPlanRepository studyPlanRepository;

    @Transactional
    public SessionInfoResponse createSession(CreateSessionRequest request) {

        // preload entity
        Clazz clazz = classRepository.findById(request.clazzId())
                .orElseThrow(() -> new BusinessException(CodeResponse.CLASS_NOT_FOUND));

        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new BusinessException(CodeResponse.COURSE_NOT_FOUND));

        Set<String> placeIds = request.scheduleRequests().stream()
                .map(ScheduleRequest::placeId)
                .collect(Collectors.toSet());
        Map<String, Place> places = placeRepository.findAllById(placeIds).stream()
                .collect(Collectors.toMap(p -> p.getPlaceId(), p -> p));

        Set<String> teacherIds = request.scheduleRequests().stream()
                .map(ScheduleRequest::teacherId)
                .collect(Collectors.toSet());
        Map<String, Teacher> teachers = teacherRepository.findByTeacherIdIn(teacherIds).stream()
                .collect(Collectors.toMap(t -> t.getTeacherId(), t -> t));

        // kiem tra tinh dung dan: dung do giua cac buoi, dung do lịch giáo viên, giáo viên không dạy mon, ..
        validateSchedule(request);
        validateCapacity(request, places);
        validateTeacher(request, teachers);

        // Kiểm tra liệu môn học có đúng trong chương trình đào tạo không
        // Nếu lớp học phần này được mở trên học kì hè năm 20xx thì có thể
        // chọn các môn nằm ở học kì 1 và 2 năm 20xx.
        // Nếu lớp học phần này mở trên học kì chính thức thì chỉ có thể
        // chọn các môn theo đúng học kì của chương trình đào tạo.
        int semester = request.semester(); // 2
        int year = request.year() - clazz.getStartYear() + 1; //2025 - 2022 + 1 = 4
        boolean isValidCourse;
        if (semester != 3) { // Học kì chính thức
            log.info("Checking exist course {} in class {}'s study plan with semester {}, year {}"
                    , course.getCourseId(), clazz.getClazzId(), semester, year);

            isValidCourse = studyPlanRepository.existsCourseInStudyPlan
                    (course.getCourseId(), clazz.getClazzId(), semester, year);

        } else {
            isValidCourse = studyPlanRepository.existsCourseInStudyPlan
                    (course.getCourseId(), clazz.getClazzId(), year);

        }
        if (!isValidCourse) throw new BusinessException(CodeResponse.DISSATISFIED_COURSE);


        // chuyen doi tuong sang entity

        Session session = sessionConverter.mapToSessionEntity(request);
        session.setCourse(course);
        session.setClazz(clazz);
        session.setStartDate(request.scheduleRequests().stream()
                .map(ScheduleRequest::startDate)
                .min(LocalDate::compareTo)
                .orElseThrow(() -> new BusinessException(CodeResponse.NO_SESSION_DATE_PROVIDED))
        );
        session.setEndDate(request.scheduleRequests().stream()
                .map(ScheduleRequest::endDate)
                .max(LocalDate::compareTo)
                .orElseThrow(() -> new BusinessException(CodeResponse.NO_SESSION_DATE_PROVIDED))
        );

        Set<Schedule> schedules = request.scheduleRequests().stream()
                .map(schedule -> {
                    Schedule scheduleEntity = scheduleConverter.mapToScheduleEntity(schedule);
                    scheduleEntity.setTeacher(teachers.get(schedule.teacherId()));
                    scheduleEntity.setPlace(places.get(schedule.placeId()));
                    scheduleEntity.setSession(session);
                    return scheduleEntity;
                }).collect(Collectors.toSet());

        session.setSchedules(schedules);

        scheduleRepository.saveAll(schedules);
        Session savedSession = sessionRepository.save(session);

        log.info("Session created: {}", savedSession.getSessionId());


        return sessionConverter.mapToSessionInfoResponse(session);
    }

    private void validateSchedule(CreateSessionRequest request) {
        List<ScheduleRequest> schedules = request.scheduleRequests();
        for (int i = 0; i < schedules.size(); i++) {
            ScheduleRequest currentSchedule = schedules.get(i);
            for (int j = i + 1; j < schedules.size(); j++) {
                ScheduleRequest otherSchedule = schedules.get(j);
                if (currentSchedule.dayOfWeek() == otherSchedule.dayOfWeek()
                        && currentSchedule.startPeriod() <= otherSchedule.endPeriod()
                        && currentSchedule.endPeriod() >= otherSchedule.startPeriod()
                        && !currentSchedule.startDate().isAfter(otherSchedule.endDate())
                        && !currentSchedule.endDate().isBefore(otherSchedule.startDate())) {
                    throw new BusinessException(CodeResponse.DISSATISFIED_SCHEDULE);
                }

                // co the cung ngay, cung gio, cung dia diem, cung lop, cung khoang thoi gian, nhung phai khac nhom
            }
        }
    }

    private void validateCapacity(CreateSessionRequest request, Map<String, Place> places) {
        int capacity = places.values().stream()
                .mapToInt(Place::getPlaceCapacity)
                .min().orElse(0);
        if (request.maxStudents() > capacity) {
            throw new BusinessException(CodeResponse.DISSATISFIED_CAPACITY);
        }
    }

    private void validateTeacher(CreateSessionRequest request, Map<String, Teacher> teachers) {
        // kiem tra xem teacher co dang ky day mon hoc khong va teacher co ranh khong

        request.scheduleRequests().forEach(schedule -> {
            boolean isRegister = teachers.get(schedule.teacherId())
                    .getCourses().stream()
                    .map(Course::getCourseId)
                    .anyMatch(courseId -> courseId.equals(request.courseId()));

            boolean hasConflict = scheduleRepository.isConflictScheduleOnTeacher(
                    schedule.teacherId(),
                    schedule.dayOfWeek(),
                    schedule.endPeriod(),
                    schedule.startPeriod(),
                    schedule.startDate(),
                    schedule.endDate()
            );

            if (!isRegister || hasConflict) {
                log.info("Dissatisfied teacher for schedule: {}", schedule.teacherId());
                throw new BusinessException(CodeResponse.DISSATISFIED_TEACHER);
            }
        });
    }
}
