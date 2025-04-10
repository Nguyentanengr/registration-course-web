package com.jikateam.registration_course.service.clazz;


import com.jikateam.registration_course.converter.ClazzConverter;
import com.jikateam.registration_course.dto.response.ClazzActiveInfoResponse;
import com.jikateam.registration_course.dto.response.ClazzInfoResponse;
import com.jikateam.registration_course.entity.Clazz;
import com.jikateam.registration_course.repository.ClassRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public List<String> getAllClazzIdActive() {

        var clazzIds = classRepository.getAllClassIdIsActive(LocalDate.now().getYear());

        log.info("List class id is Active: {}", clazzIds);
        return clazzIds;
    }

    public List<ClazzActiveInfoResponse> getAllActiveInfoClazz() {
        var clazzes = classRepository.getAllActiveClazzInfo(LocalDate.now().getYear());
        log.info("List class is Active: {}", clazzes.stream().map(Clazz::getClazzId));

        var responses = clazzes.stream()
                .map((clazz) -> {
                    int nextSemester = clazz.getCurrentSemester() == 1 ? 2 : 1;
                    int nextYear = clazz.getCurrentSemester() == 1
                            ? clazz.getStartYear() + clazz.getCurrentYear() - 1
                            : clazz.getStartYear() + clazz.getCurrentYear();
                    log.info("Class with id = {} have next semester: {}, next year: {}"
                            , clazz.getClazzId(), nextSemester, nextYear);
                    return clazzConverter.mapToClazzActiveInfoResponse(clazz, nextYear, nextSemester);
                })
                .toList();
        return responses;
    }
}
