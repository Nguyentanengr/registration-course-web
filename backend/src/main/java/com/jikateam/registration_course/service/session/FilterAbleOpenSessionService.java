package com.jikateam.registration_course.service.session;


import com.jikateam.registration_course.converter.SessionConverter;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
import com.jikateam.registration_course.entity.Clazz;
import com.jikateam.registration_course.repository.ClassRepository;
import com.jikateam.registration_course.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FilterAbleOpenSessionService {

    private final SessionRepository sessionRepository;
    private final SessionConverter sessionConverter;
    private final ClassRepository classRepository;

    public List<SessionInfoResponse> getAbleOpenSessionByFilter
            (String searchKey, String clazzId) {

        Clazz clazz = classRepository.findById(clazzId)
                .orElse(null);
        if (clazz == null) return List.of();

        // Tính năm và học kì hiện tại khớp với session
        int semester = clazz.getCurrentSemester();
        int year = clazz.getStartYear() + clazz.getCurrentYear();

        // Tính học kì kế tiếp để lọc lớp học phần.
        if (semester == 1) {
            semester = 2;
        } else if (semester == 2) {
            semester = 1;
            year += 1;
        }

        return sessionRepository.findAllAbleSessionByFilter(searchKey, year, semester, clazzId)
                .stream().map(session -> sessionConverter.mapToSessionInfoResponse(session
                        , session.getOpenSessionRegistration().getStatus())).toList();
    }
}
