package com.jikateam.registration_course.service.otp;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class OTPTokenGenerator {

    private static final int OTP_LENGTH = 6;
    private final SecureRandom random = new SecureRandom();
    private final String OTP_REGEX_PATTERN = "^\\d{6}$";

    public String generateToken() {
        int token = 100000 + random.nextInt(900000);
        return String.valueOf(token);
    }

    public boolean checkFormat(String token) {
        return token.matches(OTP_REGEX_PATTERN);
    }
}
