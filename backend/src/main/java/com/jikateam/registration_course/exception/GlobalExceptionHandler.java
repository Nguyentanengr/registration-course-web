package com.jikateam.registration_course.exception;

import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.DataResponse;
import lombok.extern.slf4j.Slf4j;
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

}
