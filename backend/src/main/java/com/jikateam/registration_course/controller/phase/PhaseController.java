package com.jikateam.registration_course.controller.phase;


import com.jikateam.registration_course.constant.PhaseType;
import com.jikateam.registration_course.dto.request.CreatePhaseRequest;
import com.jikateam.registration_course.dto.request.DeletePhaseListRequest;
import com.jikateam.registration_course.dto.request.UpdatePhaseRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.PhaseResponse;
import com.jikateam.registration_course.service.phase.PhaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = PhaseController.SESSION_API_URL)
public class PhaseController {

    public static final String SESSION_API_URL = "/api/v1/phases";
    private final PhaseService phaseService;


    @GetMapping
    public DataResponse<List<PhaseResponse>> getAllByFilter(
            @RequestParam(defaultValue = "") String searchKey,
            @RequestParam(required = false) Integer type,
            @RequestParam(required = false) Integer year
    ) {

        PhaseType convertType = type == null ? null
                : type == 0 ? PhaseType.OFFICIAL
                : type == 1 ? PhaseType.ADDITIONAL
                : null;

        List<PhaseResponse> responses = phaseService
                .getRegistrationPhaseByFilter(searchKey, convertType, year);

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<PhaseResponse>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();

    }

    @PostMapping
    public DataResponse<PhaseResponse> createRegistrationPhase
            (@RequestBody @Valid CreatePhaseRequest request) {

        PhaseResponse response = phaseService.createRegistrationPhase(request);

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<PhaseResponse>builder()
                .code(codeResponse.getCode())
                .data(response)
                .build();
    }

    @PutMapping("/{id}")
    public DataResponse<PhaseResponse> updateRegistrationPhase
            (@RequestBody @Valid UpdatePhaseRequest request, @PathVariable("id") Integer phaseId) {

        PhaseResponse response = phaseService.updateRegistrationPhase(request, phaseId);

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<PhaseResponse>builder()
                .code(codeResponse.getCode())
                .data(response)
                .build();
    }

    @DeleteMapping("/{id}")
    public DataResponse<Void> deleteRegistrationPhase(@PathVariable("id") Integer phaseId) {

        log.info("Deleted phase with id: {}", phaseId);
        phaseService.deleteRegistrationPhase(phaseId);

        CodeResponse codeResponse = CodeResponse.DELETE_PHASE_SUCCESSFULLY;
        return DataResponse.<Void>builder()
                .code(codeResponse.getCode())
                .build();
    }

    @DeleteMapping
    public DataResponse<Void> deleteRegistrationPhaseList
            (@RequestBody DeletePhaseListRequest request) {

        log.info("Deleted phase with id: {}", request);
        phaseService.deleteRegistrationPhaseList(request);

        CodeResponse codeResponse = CodeResponse.DELETE_PHASE_LIST_SUCCESSFULLY;
        return DataResponse.<Void>builder()
                .code(codeResponse.getCode())
                .build();
    }
}
