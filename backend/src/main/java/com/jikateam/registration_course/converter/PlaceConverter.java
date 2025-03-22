package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.response.PlaceInfoResponse;
import com.jikateam.registration_course.dto.response.TeacherInfoResponse;
import com.jikateam.registration_course.entity.Place;
import com.jikateam.registration_course.entity.Teacher;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlaceConverter {
    PlaceInfoResponse mapToPlaceInfoResponse(Place place);
}
