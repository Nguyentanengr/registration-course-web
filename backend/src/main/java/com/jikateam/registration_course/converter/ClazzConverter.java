package com.jikateam.registration_course.converter;

import com.jikateam.registration_course.dto.response.ClazzActiveInfoResponse;
import com.jikateam.registration_course.dto.response.ClazzInfoResponse;
import com.jikateam.registration_course.entity.Clazz;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClazzConverter {

    ClazzInfoResponse mapToClazzInfoResponse(Clazz clazz);

    @Mapping(target = "clazzId", source = "clazz.clazzId")
    @Mapping(target = "nextSemester", source = "s")
    @Mapping(target = "nextYear", source = "y")
    ClazzActiveInfoResponse mapToClazzActiveInfoResponse(Clazz clazz, Integer y, Integer s);
}
