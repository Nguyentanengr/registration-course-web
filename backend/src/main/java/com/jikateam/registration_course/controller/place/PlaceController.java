package com.jikateam.registration_course.controller.place;

import com.jikateam.registration_course.controller.session.SessionController;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.PlaceResponse;
import com.jikateam.registration_course.service.place.PlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = PlaceController.SESSION_API_URL)
public class PlaceController {

    public static final String SESSION_API_URL = "/api/v1/places";
    private final PlaceService placeService;

    @GetMapping
    public DataResponse<List<PlaceResponse>> getAllPlaces(
            @RequestParam(defaultValue = "") String searchKey
    ) {

        List<PlaceResponse> responses = placeService.getAllPlaces(searchKey);
        log.info("Response for searchKey={}: {}", searchKey, responses);

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<PlaceResponse>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();
    }

}
