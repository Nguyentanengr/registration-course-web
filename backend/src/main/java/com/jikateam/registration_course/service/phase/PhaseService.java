package com.jikateam.registration_course.service.phase;

import com.jikateam.registration_course.converter.PhaseConverter;
import com.jikateam.registration_course.dto.request.CreatePhaseRequest;
import com.jikateam.registration_course.dto.request.DeletePhaseListRequest;
import com.jikateam.registration_course.dto.request.UpdatePhaseRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.PhaseResponse;
import com.jikateam.registration_course.entity.RegistrationPhase;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.PhaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PhaseService {

    private final PhaseRepository phaseRepository;
    private final PhaseConverter phaseConverter;

    @Transactional
    public PhaseResponse createRegistrationPhase(CreatePhaseRequest request) {

        // check if phase name is exist
        if (phaseRepository.existsByRegistrationPhaseName(request.registrationPhaseName())) {
            throw new BusinessException(CodeResponse.PHASE_NAME_IS_EXIST);
        }

        // check if phase is overlapping time
        if (phaseRepository.existsOverlappingPhase(request.openTime(), request.closeTime())) {
            throw new BusinessException(CodeResponse.PHASE_TIME_OVERLAPPING);
        }

        // create phase
        RegistrationPhase registrationPhase = phaseConverter.mapToRegistrationPhaseEntity(request);

        RegistrationPhase response = phaseRepository.save(registrationPhase);

        return phaseConverter.mapToPhaseResponse(response);
    }

    @Transactional
    public PhaseResponse updateRegistrationPhase(UpdatePhaseRequest request, Integer phaseId) {


        // check if phase is exist
        RegistrationPhase phase = phaseRepository.findById(phaseId)
                .orElseThrow(() -> new BusinessException(CodeResponse.PHASE_NOT_FOUND));

        // check if phase name is exist
        if (phaseRepository.existsByRegistrationPhaseNameExcludingId
                (request.registrationPhaseName(), phase.getRegistrationPhaseId())) {
            throw new BusinessException(CodeResponse.PHASE_NAME_IS_EXIST);
        }

        // check if phase is overlapping time
        if (phaseRepository.existsOverlappingPhaseExcludingId(
                request.openTime(), request.closeTime(), phaseId)) {
            throw new BusinessException(CodeResponse.PHASE_TIME_OVERLAPPING);
        }

        phaseConverter.updateToRegistrationPhaseEntity(request, phase);

        // create phase
        RegistrationPhase response = phaseRepository.save(phase);

        return phaseConverter.mapToPhaseResponse(response);
    }

    @Transactional
    public void deleteRegistrationPhase(Integer phaseId) {

        // check if phase is exist
        RegistrationPhase phase = phaseRepository.findById(phaseId)
                .orElseThrow(() -> new BusinessException(CodeResponse.PHASE_NOT_FOUND));

        if (phase.getOpenTime().isAfter(LocalDateTime.now())) {
            phaseRepository.delete(phase);
        } else {
            throw new BusinessException(CodeResponse.PHASE_IS_OPENED);
        }

        phaseRepository.delete(phase);
    }

    @Transactional
    public void deleteRegistrationPhaseList(DeletePhaseListRequest request) {

        List<RegistrationPhase> phases = phaseRepository.findAllByIdWithOpenSession(request.phaseIds());

        boolean isExistPhaseIsOpen = phases.stream().anyMatch(phase -> !phase.getOpenSessionRegistrations().isEmpty());

        if (isExistPhaseIsOpen) throw new BusinessException(CodeResponse.PHASE_CONTAINS_OPEN_SESSION);

        phaseRepository.deleteAll(phases);
    }

    public List<PhaseResponse> getRegistrationPhaseByFilter(String searchKey, Integer semester, Integer year) {

        List<RegistrationPhase> phases = phaseRepository.findAllByFilter(searchKey, semester, year);

        return phases.stream().map(phaseConverter::mapToPhaseResponse).toList();
    }

    public PhaseResponse getLatestPhase() {

        var phaseEntity = phaseRepository.findLatest();

        return phaseConverter.mapToPhaseResponse(phaseEntity);

    }


}
