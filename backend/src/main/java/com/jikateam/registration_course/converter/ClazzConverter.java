package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.response.ClazzInfoResponse;
import com.jikateam.registration_course.entity.Clazz;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClazzConverter {

    ClazzInfoResponse mapToClazzInfoResponse(Clazz clazz);

}
