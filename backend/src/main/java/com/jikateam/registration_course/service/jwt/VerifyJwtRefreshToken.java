package com.jikateam.registration_course.service.jwt;


import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.exception.BusinessException;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class VerifyJwtRefreshToken {

    @Value("${jwt.secret-key}")
    private String secretKey;
    private final RedisTemplate<String, Object> redisTemplate;

    public JWTClaimsSet verifyToken(String token) {

        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            Date exp = signedJWT.getJWTClaimsSet().getExpirationTime();
            var jit = signedJWT.getJWTClaimsSet().getJWTID();

            // This code only verifies the integrity of the token by checking its signature.
            // It ensures that the token has not been tampered with but does NOT validate
            // claims like expiration (exp), issuer (iss), or audience (aud).
            JWSVerifier verifier = new MACVerifier(secretKey.getBytes());
            boolean verified = signedJWT.verify(verifier);

            boolean isExpired = exp.before(new Date());

            boolean isExistInBlackedList = redisTemplate.hasKey(jit);

            if (!verified || isExpired || isExistInBlackedList) {
                throw new BusinessException(CodeResponse.INVALID_REFRESH_TOKEN);
            }

            return signedJWT.getJWTClaimsSet();

        } catch (ParseException | JOSEException e) {
            log.error("An error occurred while verify token: " + e.getMessage());
            throw new BusinessException(CodeResponse.INVALID_REFRESH_TOKEN);
        }
    }

}
