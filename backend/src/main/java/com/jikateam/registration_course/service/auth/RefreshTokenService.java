package com.jikateam.registration_course.service.auth;


import com.jikateam.registration_course.dto.request.RefreshTokenRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.RefreshTokenResponse;
import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.AccountRepository;
import com.jikateam.registration_course.service.jwt.JwtBlackList;
import com.jikateam.registration_course.service.jwt.JwtTokenGenerator;
import com.jikateam.registration_course.service.jwt.VerifyJwtRefreshToken;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final JwtBlackList blackList;
    private final AccountRepository accountRepository;
    private final JwtTokenGenerator tokenGenerator;
    private final VerifyJwtRefreshToken verifyJwtRefreshToken;

    public RefreshTokenResponse refreshToken(RefreshTokenRequest request) {

        // verify token: check token format, expiration time, black list
        JWTClaimsSet claimsSet = verifyJwtRefreshToken.verifyToken(request.token());

        // get user by email
        final Account account = accountRepository.findByUsername(claimsSet.getSubject())
                .orElseThrow(() -> new BusinessException(CodeResponse.INVALID_REFRESH_TOKEN));

        String jwtAccessToken = tokenGenerator.generateAccessToken(account);
        // generate a new refresh token with an expiration time similar to the old one
        String jwtRefreshToken = tokenGenerator.generateRefreshToken(account, claimsSet.getExpirationTime());

        // add old token into black list
        blackList.cacheItem(claimsSet.getJWTID(), claimsSet.getExpirationTime());

        return RefreshTokenResponse.builder()
                .accessToken(jwtAccessToken)
                .refreshToken(jwtRefreshToken)
                .build();
    }
}
