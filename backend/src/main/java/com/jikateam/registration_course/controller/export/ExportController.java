package com.jikateam.registration_course.controller.export;

import com.jikateam.registration_course.controller.course.CourseController;
import com.jikateam.registration_course.dto.request.ExportStudentListOnSessionRequest;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.ExportResponse;
import com.jikateam.registration_course.repository.StudentRepository;
import com.jikateam.registration_course.service.export.ExportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = ExportController.EXPORT_URL_API)
public class ExportController {
    public static final String EXPORT_URL_API = "/api/v1/export";

    private final ExportService exportService;

    @PostMapping("/students-on-session")
    public ResponseEntity<Resource> exportStudentListOnSession
            (@RequestBody @Valid ExportStudentListOnSessionRequest request) throws Exception {

        ExportResponse<Resource> resourceResponse = exportService.exportStudentListOnSessions(request);
        HttpHeaders headers = buildHeaderAttachment(resourceResponse.filename());

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(resourceResponse.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resourceResponse.recourse());
    }

    private HttpHeaders buildHeaderAttachment (String filename) {
        var headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);
        headers.add(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate");
        headers.add(HttpHeaders.PRAGMA, "no-cache");
        headers.add(HttpHeaders.EXPIRES, "0");
        headers.add("Access-Control-Expose-Headers", "Content-Disposition");
        return headers;
    }
}
