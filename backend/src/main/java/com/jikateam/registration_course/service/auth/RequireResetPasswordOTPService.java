package com.jikateam.registration_course.service.auth;


import com.jikateam.registration_course.dto.request.RequireOTPRequest;
import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.AccountRepository;
import com.jikateam.registration_course.service.email.EmailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RequireResetPasswordOTPService {

    private final EmailSender emailSender;
    private final AccountRepository accountRepository;

    public void requireOTP(RequireOTPRequest request) {

        String email = request.email();

        // Check if email already has an account
        Account account = accountRepository.findByEmail(request.email())
                .orElseThrow(() -> new BusinessException(CodeResponse.EMAIl_NOT_HAVE_ACCOUNT));

        // Call OTPTokenManager to check & generate OTP and send mail by MailService
        emailSender.sendResetPasswordOTPTokenEmail(email, account.getUsername());
    }
}
