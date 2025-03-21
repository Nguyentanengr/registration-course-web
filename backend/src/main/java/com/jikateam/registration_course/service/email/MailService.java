package com.jikateam.registration_course.service.email;


import com.jikateam.registration_course.service.email.template.MailTemplate;

public interface MailService {

    void sendMail(MailTemplate template);

}
