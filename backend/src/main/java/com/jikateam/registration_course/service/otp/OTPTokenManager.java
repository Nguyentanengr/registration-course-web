package com.jikateam.registration_course.service.otp;


import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OTPTokenManager {

    private final OTPTokenCache tokenCache; // <email, OTP>
    private final OTPTokenGenerator tokenGenerator;


    public String generateOTPToken(String identity) {

        // Check if email have previous token
        Optional<String> cacheValue = tokenCache.getTokenById(identity);

        if (cacheValue.isPresent()) {
            // Not allowed generate token

            log.error("Cannot generate OTP because previous OTP is existing in cache");
            throw new BusinessException(CodeResponse.OTP_CANNOT_GENERATE);
        }

        // generate & caching token
        String OTP = tokenGenerator.generateToken();

        tokenCache.cachingToken(identity, OTP, 60);

        log.info("All Item in Redis: " + tokenCache.getAllItem());

        return OTP;
    }

    public boolean validateOTPToken(String identity, String OTP) {

        boolean isFormatted = tokenGenerator.checkFormat(OTP);

        // Get token with email
        Optional<String> cacheValue = tokenCache.getTokenById(identity);

        return isFormatted && cacheValue.isPresent() && OTP.equals(cacheValue.get());

    }

    public void removeOTPToken(String identity) {
        tokenCache.removeById(identity);
    }

}
