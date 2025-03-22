package com.jikateam.registration_course.validator;

import com.jikateam.registration_course.dto.request.ScheduleRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.entity.Place;
import com.jikateam.registration_course.entity.Schedule;
import com.jikateam.registration_course.exception.BusinessException;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@NoArgsConstructor
@Component
public class SessionValidator {

    public void validateCapacity(Integer maxStudents, Place place) {
        if (place.getPlaceCapacity() < maxStudents)
            throw new BusinessException(CodeResponse.DISSATISFIED_CAPACITY);
    }

    public void validateCapacity(Integer maxStudents, List<Place> places) {
        int capacity = places.stream()
                .mapToInt(Place::getPlaceCapacity)
                .min().orElse(0);
        if (maxStudents > capacity)
            throw new BusinessException(CodeResponse.DISSATISFIED_CAPACITY);
    }

    public void validateTeacherAssignedToCourse(String sessionCourse, List<String> teacherCourses) {
        if (!teacherCourses.contains(sessionCourse))
            throw new BusinessException(CodeResponse.DISSATISFIED_TEACHER);
    }

    public void validateScheduleConflict(List<ScheduleRequest> schedules) {
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
}
