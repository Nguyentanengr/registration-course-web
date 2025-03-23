package com.jikateam.registration_course.service.session;

import com.jikateam.registration_course.converter.SessionConverter;
import com.jikateam.registration_course.dto.request.SessionFilterRequest;
import com.jikateam.registration_course.dto.response.PageSessionInfoResponse;
import com.jikateam.registration_course.dto.response.SessionInfoResponse;
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
            Pageable pageable
    ) {

        Page<Session> page = sessionRepository.findAllSessionByFilter(
                request.searchKey(), request.year(), request.semester()
                , request.clazzId(), request.courseId(), request.status()
                , pageable
        );

        List<SessionInfoResponse> sessionInfoResponses = page.map(sessionConverter::mapToSessionInfoResponse)
                .stream().toList();

        return PageSessionInfoResponse.builder()
                .sessions(sessionInfoResponses)
                .totalPages(page.getTotalPages())
                .build();
    }
}
