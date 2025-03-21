package com.jikateam.registration_course.controller.auth;

import com.jikateam.registration_course.dto.request.*;
import com.jikateam.registration_course.dto.response.*;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.service.auth.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = UserAuthController.USER_SECURITY_API_URL)
public class UserAuthController implements AuthBase{

    public static final String USER_SECURITY_API_URL = "/api/v1/auth/";

    @Value("${jwt.refresh-token-duration}")
    private long refreshTokenDuration; // minute

    private final UserAuthenticationService userAuthenticationService;
    private final RequireResetPasswordOTPService requireResetPasswordOTPService;
    private final UserResetPasswordService userResetPasswordService;
    private final RefreshTokenService refreshTokenService;
    private final UserLogoutService userLogoutService;


    @Override
    @PostMapping("/reset-password/require-otp")
    public DataResponse<Void> requireResetPasswordOTP(@RequestBody @Valid RequireOTPRequest request) {

        requireResetPasswordOTPService.requireOTP(request);

        return DataResponse.<Void>builder()
                .code(CodeResponse.EMAIL_HAS_BEEN_SEND.getCode())
                .message(CodeResponse.EMAIL_HAS_BEEN_SEND.getMessage())
                .build();
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<DataResponse<UserAuthenticationResponse>> authenticate
            (@RequestBody @Valid UserAuthenticationRequest request) {

        UserAuthenticationResponse response = userAuthenticationService.authenticate(request);

        // wrap data with normal object
        CodeResponse codeResponse = CodeResponse.LOGIN_SUCCESSFULLY;
        DataResponse<UserAuthenticationResponse> dataResponse = DataResponse
                .<UserAuthenticationResponse>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(response)
                .build();

        return new ResponseEntity<>(
                dataResponse,
                buildHeader("refreshToken", response.refreshToken(), refreshTokenDuration), // param[3]: maxAge
                codeResponse.getStatus()
        );
    }

    @Override
    @PostMapping("/refresh-token")
    public ResponseEntity<DataResponse<RefreshTokenResponse>> refreshToken
            (HttpServletRequest request) {

        String refreshToken = extractCookie(request, "refreshToken");

        if (Objects.isNull(refreshToken)) {
            throw new BusinessException(CodeResponse.INVALID_REFRESH_TOKEN);
        }

        RefreshTokenResponse response = refreshTokenService
                .refreshToken(RefreshTokenRequest.builder()
                        .token(refreshToken)
                        .build()
                );

        // wrap data with normal object
        CodeResponse codeResponse = CodeResponse.REFRESH_TOKEN_SUCCESSFULLY;
        DataResponse<RefreshTokenResponse> dataResponse = DataResponse
                .<RefreshTokenResponse>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(response)
                .build();

        return new ResponseEntity<>(
                dataResponse,
                buildHeader("refreshToken", response.refreshToken(), refreshTokenDuration),
                codeResponse.getStatus()
        );
    }

    @Override
    @PostMapping("/logout")
    public DataResponse<Void> logout(HttpServletRequest request) {
        String refreshToken = extractCookie(request, "refreshToken");
        log.info("Refresh token from cookie: " + refreshToken);
        if (Objects.nonNull(refreshToken)) {
            userLogoutService.logout(UserLogoutRequest.builder()
                            .token(refreshToken)
                            .build());
        }
        return DataResponse.<Void>builder()
                .code(CodeResponse.LOGOUT_SUCCESSFULLY.getCode())
                .message(CodeResponse.LOGOUT_SUCCESSFULLY.getMessage())
                .build();
    }


    @Override
    @PostMapping("/reset-password")
    public ResponseEntity<DataResponse<UserResetPasswordResponse>> resetPassword
            (@RequestBody @Valid UserResetPasswordRequest request) {

        UserResetPasswordResponse response = userResetPasswordService.resetPassword(request);

        // wrap data with normal object
        CodeResponse codeResponse = CodeResponse.RESET_PASSWORD_SUCCESSFULLY;
        DataResponse<UserResetPasswordResponse> dataResponse = DataResponse
                .<UserResetPasswordResponse>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(response)
                .build();

        HttpHeaders headers = buildHeader("refreshToken", response.refreshToken(), refreshTokenDuration);

        return new ResponseEntity<>(
                dataResponse,
                headers,
                codeResponse.getStatus()
        );
    }

    private HttpHeaders buildHeader(String name, String value, long maxAge) {
        ResponseCookie cookie = ResponseCookie
                .from(name, value)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(maxAge)
                .sameSite("Strict")
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
        return headers;
    }

    private String extractCookie(HttpServletRequest request, String key) {
        Cookie[] cookies = request.getCookies();
        if (Objects.nonNull(cookies)) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(key)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    @GetMapping("/hello")
    public DataResponse<Void> hello() {
        if (true) throw new RuntimeException("Black");
        return DataResponse.<Void>builder()
                .code(1000L)
                .message("Hello, you are authenticated!")
                .build();
    }
}
