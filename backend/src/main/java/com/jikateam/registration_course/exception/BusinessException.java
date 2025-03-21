package com.jikateam.registration_course.exception;


import com.jikateam.registration_course.dto.response.CodeResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessException extends RuntimeException {

    private final CodeResponse codeResponse;

    public BusinessException(CodeResponse codeResponse) {
        super(codeResponse.getMessage());
        this.codeResponse = codeResponse;
    }
}
