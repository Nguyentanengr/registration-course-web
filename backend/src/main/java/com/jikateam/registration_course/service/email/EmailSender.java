package com.jikateam.registration_course.service.email;

import com.jikateam.registration_course.service.email.template.RegistrationTokenMailTemplate;
import com.jikateam.registration_course.service.email.template.ResetPasswordTokenMailTemplate;
import com.jikateam.registration_course.service.otp.OTPTokenManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


/**
 * "This class is only used for sending different types of emails,
 * selecting a template for the corresponding email based on each function,
 * signing the sender, adding information to it, and sending it."
 *
 * @author Nguyen Tan
 * @version 1.0
 */


@Service
@RequiredArgsConstructor
public class EmailSender {

    private final MailService mailService;
    private final OTPTokenManager tokenManager;
    private final ResetPasswordTokenMailTemplate resetPasswordTokenTemplate;


    public void sendResetPasswordOTPTokenEmail(String email, String nickname) {

        // Generate token
        String OTPToken = tokenManager.generateOTPToken(email);

        // Create a mail template
        resetPasswordTokenTemplate.setRecipient(email);
        resetPasswordTokenTemplate.setToken(OTPToken);
        resetPasswordTokenTemplate.setNickname(nickname);

        mailService.sendMail(resetPasswordTokenTemplate);

    }
}
