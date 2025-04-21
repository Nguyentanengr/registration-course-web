package com.jikateam.registration_course.controller.phase;


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
@RequestMapping(value = PhaseController.PHASE_API_URL)
public class PhaseController {

    public static final String PHASE_API_URL = "/api/v1/phases";
    private final PhaseService phaseService;


    @GetMapping
    public DataResponse<?> getAllByFilter(
            @RequestParam(defaultValue = "") String searchKey,
            @RequestParam(required = false) Integer semester,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Boolean latest
    ) {

        if (Boolean.TRUE.equals(latest)) {
            var phaseResponse = phaseService.getLatestPhase();

            CodeResponse codeResponse = CodeResponse.SUCCESS;
            return DataResponse.<PhaseResponse>builder()
                    .code(codeResponse.getCode())
                    .data(phaseResponse)
                    .build();
        }

        List<PhaseResponse> responses = phaseService
                .getRegistrationPhaseByFilter(searchKey, semester, year);

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<PhaseResponse>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();

    }

    @GetMapping("/able")
    public DataResponse<?> getAllAbleByFilter(
            @RequestParam(defaultValue = "") String searchKey,
            @RequestParam(required = false) Integer semester,
            @RequestParam(required = false) Integer year
    ) {


        List<PhaseResponse> responses = phaseService
                .getAblePhaseByFilter(searchKey, semester, year);

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
