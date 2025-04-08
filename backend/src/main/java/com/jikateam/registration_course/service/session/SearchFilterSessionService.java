package com.jikateam.registration_course.service.session;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.converter.SessionConverter;
import com.jikateam.registration_course.dto.request.SessionFilterRequest;
import com.jikateam.registration_course.dto.response.PageSessionInfoResponse;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
import com.jikateam.registration_course.entity.Schedule;
import com.jikateam.registration_course.entity.Session;
import com.jikateam.registration_course.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchFilterSessionService {

    private final SessionRepository sessionRepository;
    private final SessionConverter sessionConverter;

    public PageSessionInfoResponse getAllSession(
            SessionFilterRequest request,
            Integer status,
            Pageable pageable
    ) {

        Page<Session> page = sessionRepository.findAllSessionByFilter(
                request.searchKey(), request.year(), request.semester()
                , request.clazzId(), request.courseId(), status
                , pageable
        );


        List<SessionInfoResponse> sessionInfoResponses = page.map(session -> {
                    RegistrationStatus rs = session.getOpenSessionRegistration() != null
                            ? session.getOpenSessionRegistration().getStatus()
                            : null;
                    List<Integer> scheduleIds = session.getSchedules().stream()
                            .map(Schedule::getScheduleId).toList();
                    return sessionConverter.mapToSessionInfoResponse(session
                            , rs, scheduleIds);
                })
                .toList();

        return PageSessionInfoResponse.builder()
                .sessions(sessionInfoResponses)
                .totalPages(page.getTotalPages())
                .build();
    }
}
