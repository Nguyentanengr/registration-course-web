package com.jikateam.registration_course.service.email.template;


import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class ResetPasswordTokenMailTemplate extends MailTemplate {

    protected String token;
    protected String nickname;

    public ResetPasswordTokenMailTemplate() {
        super(MailTemplateConstant.MAIL_SENDER, MailTemplateConstant.MAIL_TEMPLATE_RESET_PASSWORD_TOKEN_SUBJECT);
    }


    @Override
    public String buildBody() {
        return MailTemplateConstant.MAIL_TEMPLATE_RESET_PASSWORD_TOKEN_HTML
                .replace("${this.token}", this.token)
                .replace("${this.nickname", this.nickname);
    }
}
