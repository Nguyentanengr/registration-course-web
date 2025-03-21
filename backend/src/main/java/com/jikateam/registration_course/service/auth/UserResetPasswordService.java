package com.jikateam.registration_course.service.auth;


import com.jikateam.registration_course.dto.request.UserResetPasswordRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.UserResetPasswordResponse;
import com.jikateam.registration_course.dto.response.UserResponse;
import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.AccountRepository;
import com.jikateam.registration_course.service.jwt.JwtTokenGenerator;
import com.jikateam.registration_course.service.otp.OTPTokenManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserResetPasswordService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final OTPTokenManager tokenManager;

    public UserResetPasswordResponse resetPassword(UserResetPasswordRequest request) {

        boolean isVerified = tokenManager.validateOTPToken(request.email(), request.code());

        if (!isVerified) throw new BusinessException(CodeResponse.OTP_INCORRECT_OR_EXPIRED);

        // invalid OTP token
        tokenManager.removeOTPToken(request.email());

        // get user by email
        Account account = accountRepository.findByEmail(request.email())
                .orElseThrow(() -> new BusinessException(CodeResponse.OTP_INCORRECT_OR_EXPIRED));

        // update password into user
        account.setPassword(passwordEncoder.encode(request.newPassword()));

        // save user
        accountRepository.save(account);

        // generate access & refresh token
        String jwtAccessToken = jwtTokenGenerator.generateAccessToken(account);
        String jwtRefreshToken = jwtTokenGenerator.generateRefreshToken(account);

        UserResponse userResponse = UserResponse.fromEntity(account);

        return UserResetPasswordResponse.builder()
                .user(userResponse)
                .accessToken(jwtAccessToken)
                .refreshToken(jwtRefreshToken)
                .build();
    }
}
