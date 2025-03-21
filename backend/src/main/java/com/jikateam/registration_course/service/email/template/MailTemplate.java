package com.jikateam.registration_course.service.email.template;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class MailTemplate {

    protected String sender;
    protected String recipient;
    protected String subject;

    public MailTemplate(String sender, String subject) {
        this.sender = sender;
        this.subject = subject;
    }

    public abstract String buildBody();
}
