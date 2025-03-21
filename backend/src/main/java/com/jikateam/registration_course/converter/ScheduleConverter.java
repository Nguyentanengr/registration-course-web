package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.request.CreateSessionRequest;
import com.jikateam.registration_course.dto.request.ScheduleRequest;
import com.jikateam.registration_course.entity.Schedule;
import com.jikateam.registration_course.entity.Session;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ScheduleConverter {

    Schedule mapToScheduleEntity(ScheduleRequest request);

}
