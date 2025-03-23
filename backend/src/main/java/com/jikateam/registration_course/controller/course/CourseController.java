package com.jikateam.registration_course.controller.course;

import com.jikateam.registration_course.controller.place.PlaceController;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.CourseInfoResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.PlaceResponse;
import com.jikateam.registration_course.entity.Course;
import com.jikateam.registration_course.service.course.CourseService;
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
@RequestMapping(value = CourseController.SESSION_API_URL)
public class CourseController {

    public static final String SESSION_API_URL = "/api/v1/courses";
    private final CourseService courseService;

    @GetMapping
    public DataResponse<List<CourseInfoResponse>> getAllCourseByFilter(
            @RequestParam(defaultValue = "") String searchKey,
            @RequestParam(required = false) String classId,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer semester
    ) {

        List<CourseInfoResponse> responses =
                courseService.getAllCourseByFilter(searchKey, classId, year, semester);

        log.info("Response for searchKey={}, classId={}, year={}, semester={}: {}"
                , searchKey, classId, year, semester, responses.stream().map(CourseInfoResponse::courseId));

        CodeResponse codeResponse = CodeResponse.SUCCESS;
        return DataResponse.<List<CourseInfoResponse>>builder()
                .code(codeResponse.getCode())
                .data(responses)
                .build();

    }
}
