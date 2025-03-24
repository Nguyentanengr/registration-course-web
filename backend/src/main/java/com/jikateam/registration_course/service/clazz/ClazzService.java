package com.jikateam.registration_course.service.clazz;


import com.jikateam.registration_course.converter.ClazzConverter;
import com.jikateam.registration_course.dto.response.ClazzInfoResponse;
import com.jikateam.registration_course.entity.Clazz;
import com.jikateam.registration_course.repository.ClassRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClazzService {

    private final ClassRepository classRepository;
    private final ClazzConverter clazzConverter;

    public List<ClazzInfoResponse> getAllByFilter(String searchKey, Integer year) {

        List<Clazz> responses = classRepository.findAllByFilter(searchKey, year);

        return responses.stream().map(clazzConverter::mapToClazzInfoResponse).toList();
    }
}
