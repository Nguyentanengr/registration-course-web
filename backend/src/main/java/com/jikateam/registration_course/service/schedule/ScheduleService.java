package com.jikateam.registration_course.service.schedule;


import com.jikateam.registration_course.converter.ScheduleConverter;
import com.jikateam.registration_course.dto.response.ScheduleOnSessionResponse;
import com.jikateam.registration_course.dto.response.SchedulesOnWeekResponse;
import com.jikateam.registration_course.dto.response.TimetableResponse;
import com.jikateam.registration_course.entity.Schedule;
import com.jikateam.registration_course.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ScheduleConverter scheduleConverter;

    private boolean isOverlapping(LocalDate weekStart, LocalDate weekEnd
            , LocalDate scheduleStart, LocalDate scheduleEnd) {
        return !weekStart.isAfter(scheduleEnd) && !weekEnd.isBefore(scheduleStart);
    }


    public List<SchedulesOnWeekResponse> getSchedulesOnWeek
            (String studentId, Integer semester, Integer year) {

        var scheduleEntities = scheduleRepository
                .fetchByStudentOnSemesterAndYear(studentId, semester, year);

        if (!scheduleEntities.isEmpty()) {
            // Tìm ra ngày bắt đầu cho cả học kì
            LocalDate startDate = scheduleEntities.stream()
                    .map(Schedule::getStartDate)
                    .min(Comparator.naturalOrder()).get();

            // Tìm ra ngày kết thúc cho cả học kì
            LocalDate endDate = scheduleEntities.stream()
                    .map(Schedule::getEndDate)
                    .max(Comparator.naturalOrder()).get();

            // Điều chỉnh startDate về Thứ 2 của tuần chứa startDate
            LocalDate firstMonday = startDate.with(DayOfWeek.MONDAY);

            // Điều chỉnh endDate về Chủ Nhật của tuần chứa endDate
            LocalDate lastSunday = endDate.with(DayOfWeek.SUNDAY);

            // Tính số tuần giữa firstMonday và lastSunday
            long weeksBetween = ChronoUnit.WEEKS.between(firstMonday, lastSunday) + 1;

            // Tạo danh sách các tuần và các buổi học trong từng tuần
            List<SchedulesOnWeekResponse> schedulesOnWeeks = new ArrayList<>();
            for (int week = 1; week <= weeksBetween; week++) {
                // Tính ngày bắt đầu và kết thúc của tuần
                LocalDate weekStartDate = firstMonday.plusWeeks(week - 1);
                LocalDate weekEndDate = weekStartDate.plusDays(6); // Từ Thứ 2 đến Chủ Nhật

                // Lọc các buổi học thuộc tuần này
                List<TimetableResponse> timetables = scheduleEntities.stream()
                        .filter(schedule -> isOverlapping(weekStartDate, weekEndDate, schedule.getStartDate(), schedule.getEndDate()))
                        .map(this::mapToTimetableResponse)
                        .toList();

                // Tạo SchedulesOnWeekResponse cho tuần này
                SchedulesOnWeekResponse weekResponse = SchedulesOnWeekResponse.builder()
                        .week(week)
                        .startDate(weekStartDate)
                        .endDate(weekEndDate)
                        .timetables(timetables)
                        .build();

                schedulesOnWeeks.add(weekResponse);
            }

            return schedulesOnWeeks;
        }
        return List.of();
    }

    public List<ScheduleOnSessionResponse> getSchedulesOnSession(String sessionId) {

        var schedules = scheduleRepository.fetchBySessionId(sessionId);

        log.info("Total schedules for sessionId {} is {}", sessionId, schedules.size());
        return schedules.stream()
                .map(scheduleConverter::mapToScheduleOnSessionResponse)
                .toList();
    }

    private TimetableResponse mapToTimetableResponse(Schedule schedule) {
        return TimetableResponse.builder()
                .courseId(schedule.getSession().getCourse().getCourseId())
                .courseName(schedule.getSession().getCourse().getCourseName())
                .group(schedule.getSession().getGroupNumber())
                .placeId(schedule.getPlace().getPlaceId())
                .teacherName(schedule.getTeacher().getFullname())
                .dayOfWeek(schedule.getDayOfWeek())
                .startPeriod(schedule.getStartPeriod())
                .endPeriod(schedule.getEndPeriod())
                .build();
    }
}
