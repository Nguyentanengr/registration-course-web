package com.jikateam.registration_course.controller.auth;

import com.jikateam.registration_course.dto.request.RequireOTPRequest;
import com.jikateam.registration_course.dto.request.UserAuthenticationRequest;
import com.jikateam.registration_course.dto.request.UserResetPasswordRequest;
import com.jikateam.registration_course.dto.response.DataResponse;
import com.jikateam.registration_course.dto.response.RefreshTokenResponse;
import com.jikateam.registration_course.dto.response.UserAuthenticationResponse;
import com.jikateam.registration_course.dto.response.UserResetPasswordResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

public interface AuthBase {

    ResponseEntity<DataResponse<UserAuthenticationResponse>> authenticate(UserAuthenticationRequest request);

    DataResponse<Void> requireResetPasswordOTP(RequireOTPRequest request);

    ResponseEntity<DataResponse<UserResetPasswordResponse>> resetPassword(UserResetPasswordRequest request);

    ResponseEntity<DataResponse<RefreshTokenResponse>> refreshToken(HttpServletRequest request);

    DataResponse<Void> logout(HttpServletRequest request);
}
