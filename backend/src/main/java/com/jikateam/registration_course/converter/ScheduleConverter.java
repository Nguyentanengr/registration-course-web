package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.request.CreateSessionRequest;
import com.jikateam.registration_course.dto.request.ScheduleRequest;
import com.jikateam.registration_course.dto.response.ScheduleInfoResponse;
import com.jikateam.registration_course.dto.response.ScheduleOnSessionResponse;
import com.jikateam.registration_course.dto.response.ScheduleResponse;
import com.jikateam.registration_course.dto.response.SchedulesOnSessionResponse;
import com.jikateam.registration_course.entity.Schedule;
import com.jikateam.registration_course.entity.Session;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.lang.annotation.Target;

@Mapper(componentModel = "spring")
public interface ScheduleConverter {

    @Mapping(target = "scheduleId", ignore = true)
    Schedule mapToScheduleEntity(ScheduleRequest request);

    @Mapping(target = "scheduleId", ignore = true)
    Schedule updateToScheduleEntity(ScheduleRequest request, @MappingTarget Schedule schedule);

    ScheduleInfoResponse mapToScheduleInfoResponse(Schedule schedule);

    ScheduleResponse mapToScheduleResponse(Schedule schedule);


    @Mapping(target = "teacherName", source = "teacher.fullname")
    @Mapping(target = "teacherId", source = "teacher.teacherId")
    @Mapping(target = "placeId", source = "place.placeId")
    ScheduleOnSessionResponse mapToScheduleOnSessionResponse(Schedule schedule);
}
