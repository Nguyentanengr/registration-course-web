package com.jikateam.registration_course.exception;

import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(value = BusinessException.class)
    public ResponseEntity<DataResponse<?>> handlingBusinessException(BusinessException exception) {

        CodeResponse codeResponse = exception.getCodeResponse();

        DataResponse<Void> dataResponse = DataResponse.<Void>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .build();

        return new ResponseEntity<>(
                dataResponse,
                codeResponse.getStatus()
        );
    }


    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<DataResponse<?>> handlingMethodArgumentNotValidException
            (MethodArgumentNotValidException ex) {

        ex.getMessage();

        log.error(ex.getFieldError().getDefaultMessage());
        CodeResponse codeResponse = CodeResponse.valueOf(ex.getFieldError().getDefaultMessage());

        DataResponse<Void> dataResponse = DataResponse.<Void>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .build();

        return new ResponseEntity<>(
                dataResponse,
                codeResponse.getStatus()
        );
    }

    @ExceptionHandler(value = DataIntegrityViolationException.class)
    public ResponseEntity<DataResponse<?>> handleDataIntegrityViolationException
            (DataIntegrityViolationException exception) {

        String rootMessage = extractRootCauseMessage(exception);
        log.info("DataIntegrityViolationException: {}", rootMessage);

        DataResponse<Void> dataResponse = DataResponse.<Void>builder()
                .code(9999L)
                .message(rootMessage)
                .build();

        return new ResponseEntity<>(
                dataResponse,
                HttpStatus.CONFLICT
        );

    }


    private String extractRootCauseMessage(Exception ex) {
        Throwable cause = ex.getCause();
        while (cause != null && cause.getCause() != null) {
            cause = cause.getCause();
        }
        return cause != null ? cause.getMessage() : ex.getMessage();
    }
}
