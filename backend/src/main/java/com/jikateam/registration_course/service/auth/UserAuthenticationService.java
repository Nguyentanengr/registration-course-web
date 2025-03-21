package com.jikateam.registration_course.service.auth;


import com.jikateam.registration_course.dto.request.UserAuthenticationRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.dto.response.UserAuthenticationResponse;
import com.jikateam.registration_course.dto.response.UserResponse;
import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.service.jwt.JwtTokenGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenGenerator tokenGenerator;

    public UserAuthenticationResponse authenticate(UserAuthenticationRequest request) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password()));

            Account account = (Account) authentication.getPrincipal();

            String jwtAccessToken = tokenGenerator.generateAccessToken(account);
            String jwtRefreshToken = tokenGenerator.generateRefreshToken(account);

            UserResponse userResponse = UserResponse.fromEntity(account);

            return UserAuthenticationResponse.builder()
                    .user(userResponse)
                    .accessToken(jwtAccessToken)
                    .refreshToken(jwtRefreshToken)
                    .build();

        } catch (UsernameNotFoundException | BadCredentialsException e) {
            throw new BusinessException(CodeResponse.LOGIN_FAIL);
        } catch (LockedException e) {
            throw new BusinessException(CodeResponse.ACCOUNT_HAS_BEEN_LOCKED);
        }
    }
}
