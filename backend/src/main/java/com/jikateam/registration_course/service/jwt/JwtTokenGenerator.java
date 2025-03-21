package com.jikateam.registration_course.service.jwt;


import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.exception.BusinessException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Slf4j
@Service
public class JwtTokenGenerator {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.token.issuer}")
    private String issuer;

    @Value("${jwt.access-token-duration}")
    private Integer accessTokenDuration; // 5 minutes

    @Value("${jwt.refresh-token-duration}")
    private Integer refreshTokenDuration; // 1/2 year = 262800 minutes

    private final JWSAlgorithm alg = JWSAlgorithm.HS512;

    public String generateAccessToken(final Account account) {

        // create header jwt token
        JWSHeader header = new JWSHeader(alg);

        // create payload jwt token
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .jwtID(UUID.randomUUID().toString())
                .subject(account.getUsername())
                .issuer(issuer)
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(accessTokenDuration, ChronoUnit.MINUTES).toEpochMilli()
                ))
                .claim("scope", buildScope(account))
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        // create jwt object with header and payload
        JWSObject object = new JWSObject(header, payload);

        // sign secret key into jwt object and serialize jwt object -> jwt token
        try {
            object.sign(new MACSigner(secretKey.getBytes()));
            return object.serialize();
        } catch (Exception e) {
            log.error("An error occurred while serialize jwt object: " + e.getMessage());
            throw new BusinessException(CodeResponse.JWT_TOKEN_CANNOT_GENERATE);
        }
    }

    public String generateRefreshToken(final Account account) {

        // create header jwt token
        JWSHeader header = new JWSHeader(alg);

        // create payload jwt token
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .jwtID(UUID.randomUUID().toString())
                .subject(account.getUsername())
                .issuer(issuer)
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(refreshTokenDuration, ChronoUnit.MINUTES).toEpochMilli()
                ))
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        // create jwt object with header and payload
        JWSObject object = new JWSObject(header, payload);

        // sign secret key into jwt object and serialize jwt object -> jwt token
        try {
            object.sign(new MACSigner(secretKey.getBytes()));
            return object.serialize();
        } catch (Exception e) {
            log.error("An error occurred while serialize jwt object: " + e.getMessage());
            throw new BusinessException(CodeResponse.JWT_TOKEN_CANNOT_GENERATE);
        }
    }

    public String generateRefreshToken(final Account account, Date exp) {

        // create header jwt token
        JWSHeader header = new JWSHeader(alg);

        // create payload jwt token
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .jwtID(UUID.randomUUID().toString())
                .subject(account.getUsername())
                .issuer(issuer)
                .issueTime(new Date())
                .expirationTime(exp)
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        // create jwt object with header and payload
        JWSObject object = new JWSObject(header, payload);

        // sign secret key into jwt object and serialize jwt object -> jwt token
        try {
            object.sign(new MACSigner(secretKey.getBytes()));
            return object.serialize();
        } catch (Exception e) {
            log.error("An error occurred while serialize jwt object: " + e.getMessage());
            throw new BusinessException(CodeResponse.JWT_TOKEN_CANNOT_GENERATE);
        }
    }



    private String buildScope(final Account account) {
        StringJoiner stringJoiner = new StringJoiner("");
        stringJoiner.add("ROLE_" + account.getRole().getRoleName());
        return stringJoiner.toString();
    }
}
