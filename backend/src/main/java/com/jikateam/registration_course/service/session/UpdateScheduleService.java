package com.jikateam.registration_course.service.session;

import com.jikateam.registration_course.converter.ScheduleConverter;
import com.jikateam.registration_course.converter.SessionConverter;
import com.jikateam.registration_course.dto.request.ScheduleRequest;
import com.jikateam.registration_course.dto.request.UpdateSchedulesRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.SchedulesOnSessionResponse;
import com.jikateam.registration_course.entity.*;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.*;
import com.jikateam.registration_course.validator.SessionValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UpdateScheduleService {

    private final SessionRepository sessionRepository;
    private final ScheduleConverter scheduleConverter;
    private final OpenSessionRegistrationRepository openSessionRegistrationRepository;
    private final PlaceRepository placeRepository;
    private final TeacherRepository teacherRepository;
    private final ScheduleRepository scheduleRepository;
    private final SessionConverter sessionConverter;
    private final SessionValidator sessionValidator;

    @Transactional
    public SchedulesOnSessionResponse updateSchedule
            (UpdateSchedulesRequest request, Integer sessionId) {

        Session session = sessionRepository.findSessionForUpdate(sessionId)
                .orElseThrow(() -> new BusinessException(CodeResponse.SESSION_NOT_FOUND));

        // IMPORTANT: Không thể thay đổi lịch học khi trạng thái của lớp học phần này là đã mở hoặc từng được mở
        boolean invalidStatus = openSessionRegistrationRepository.invalidUpdateStatus(sessionId);
        if (invalidStatus) throw new BusinessException(CodeResponse.SESSION_IS_CONFLICT);

        // Xóa toàn bộ lịch học cũ
        scheduleRepository.deleteAllBySessionId(sessionId);

        // Cập nhật lại toàn bộ lịch học mới.
        Set<String> placeIds = request.schedules().stream()
                .map(ScheduleRequest::placeId)
                .collect(Collectors.toSet());
        Map<String, Place> places = placeRepository.findAllById(placeIds).stream()
                .collect(Collectors.toMap(Place::getPlaceId, p -> p));

        Set<String> teacherIds = request.schedules().stream()
                .map(ScheduleRequest::teacherId)
                .collect(Collectors.toSet());
        Map<String, Teacher> teachers = teacherRepository.findByTeacherIdIn(teacherIds).stream()
                .collect(Collectors.toMap(Teacher::getTeacherId, t -> t));


        // Lưu tất cả entity -> save batch
        Set<Schedule> cacheSaveEntities = new HashSet<>();

        List<ScheduleRequest> scheduleRequests = request.schedules();
        for (ScheduleRequest scheduleRequest : scheduleRequests) {

            Schedule scheduleEntity = scheduleConverter.mapToScheduleEntity(scheduleRequest);

            Place place = places.get(scheduleRequest.placeId());
            if (place == null) throw new BusinessException(CodeResponse.PLACE_NOT_FOUND);

            // Kiểm tra thỏa mãn số lượng chỗ ngồi
            validateCapacity(session, place);
            scheduleEntity.setPlace(place);

            Teacher teacher = teachers.get(scheduleRequest.teacherId());
            if (teacher == null) throw new BusinessException(CodeResponse.TEACHER_NOT_FOUND);

            // Kiểm tra giảng viên có thỏa mãn lịch giảng dạy & môn học không
            validateTeacher(session, teacher, scheduleRequest);
            scheduleEntity.setTeacher(teacher);

            scheduleEntity.setSession(session);

            // lưu vào trong batch
            cacheSaveEntities.add(scheduleEntity);
        }
        // Kiểm tra xung đột giữa các buổi học với nhau
        validateSchedule(cacheSaveEntities.stream().toList());

        session.setStartDate(cacheSaveEntities.stream()
                .map(Schedule::getStartDate)
                .min(LocalDate::compareTo)
                .orElseThrow(() -> new BusinessException(CodeResponse.NO_SESSION_DATE_PROVIDED))
        );
        session.setEndDate(cacheSaveEntities.stream()
                .map(Schedule::getEndDate)
                .max(LocalDate::compareTo)
                .orElseThrow(() -> new BusinessException(CodeResponse.NO_SESSION_DATE_PROVIDED))
        );

        session.setSchedules(cacheSaveEntities);

        log.info("Saving all {} schedules...", cacheSaveEntities.size());

        scheduleRepository.saveAll(cacheSaveEntities);
        sessionRepository.save(session);

        log.info("Updated session {} with startDate = {}, endDate = {}"
                , session.getSessionId(), session.getStartDate(), session.getEndDate());

        return sessionConverter.mapToSchedulesOnSessionResponse(session);
    }

    private void validateCapacity(Session session, Place place) {
        if (place.getPlaceCapacity() < session.getMaxStudents()) {
            throw new BusinessException(CodeResponse.DISSATISFIED_CAPACITY);
        }
    }

    private void validateTeacher(Session session, Teacher teacher, ScheduleRequest schedule) {
        // kiem tra xem teacher co dang ky day mon hoc vua duoc thay doi khong
        boolean isRegister = teacher.getCourses().stream()
                .map(Course::getCourseId)
                .anyMatch(courseId -> courseId.equals(session.getCourse().getCourseId()));

        boolean hasConflict = scheduleRepository.isConflictScheduleOnTeacher(
                schedule.teacherId(),
                schedule.dayOfWeek(),
                schedule.endPeriod(),
                schedule.startPeriod(),
                schedule.startDate(),
                schedule.endDate()
        );

        if (!isRegister || hasConflict) {
            throw new BusinessException(CodeResponse.DISSATISFIED_TEACHER);
        }
    }

    private void validateSchedule(List<Schedule> schedules) {
//        List<ScheduleRequest> schedules = request.scheduleRequests();
        for (int i = 0; i < schedules.size(); i++) {
            Schedule currentSchedule = schedules.get(i);
            for (int j = i + 1; j < schedules.size(); j++) {
                Schedule otherSchedule = schedules.get(j);
                if (currentSchedule.getDayOfWeek() == otherSchedule.getDayOfWeek()
                        && currentSchedule.getStartPeriod() <= otherSchedule.getStartPeriod()
                        && currentSchedule.getEndPeriod() >= otherSchedule.getStartPeriod()
                        && !currentSchedule.getStartDate().isAfter(otherSchedule.getEndDate())
                        && !currentSchedule.getEndDate().isBefore(otherSchedule.getStartDate())) {
                    throw new BusinessException(CodeResponse.DISSATISFIED_SCHEDULE);
                }

                // co the cung ngay, cung gio, cung dia diem, cung lop, cung khoang thoi gian, nhung phai khac nhom
            }
        }
    }

}

