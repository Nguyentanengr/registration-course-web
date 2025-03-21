package com.jikateam.registration_course.service.email.template;

public final class MailTemplateConstant {

    public static final String MAIL_SENDER = "nguyen.tan.engr@gmail.com";
    public static final String MAIL_SENDER_NAME = "Twitch Support";
    public static final String MAIL_TEMPLATE_REGISTRATION_TOKEN_SUBJECT = "Your confirmation code";
    public static final String MAIL_TEMPLATE_RESET_PASSWORD_TOKEN_SUBJECT = "Your Twitch password";
    public static final String MAIL_TEMPLATE_REGISTRATION_TOKEN_HTML =
            """
                <html>
                  <body style="font-family: Arial, sans-serif; text-align: center;">
                    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                      <img src="https://freelogopng.com/images/all_img/1656151360twitch-logo-png.png" alt="Twitch Logo" width="150">
                      <hr style="border: none; border-top: 1px solid #ddd;">
                      <p>Hey new friend!,</p>
                      <p>Here is your One-Time Password (OTP) for account verification:</p>
                      <p style="font-size: 24px; font-weight: bold; background-color: #f3f3f3; display: inline-block; padding: 10px 20px; border-radius: 5px;">
                        <span style="color: #9146FF;">${this.token}</span>
                      </p>
                      <p>This OTP is valid for the next 1 minute. Do not share this code with anyone.</p>
                      <hr style="border: none; border-top: 1px solid #ddd;">
                      <p style="font-size: 12px; color: gray;">© 2025 Twitch, All Rights Reserved</p>
                      <p style="font-size: 12px; color: gray;">350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA</p>
                    </div>
                  </body>
                </html>
            """;

    public static final String MAIL_TEMPLATE_RESET_PASSWORD_TOKEN_HTML =
            """
                <html>
                  <body style="font-family: Arial, sans-serif; text-align: center;">
                    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                      <img src="https://freelogopng.com/images/all_img/1656151360twitch-logo-png.png" alt="Twitch Logo" width="150">
                      <hr style="border: none; border-top: 1px solid #ddd;">
                      <p>Hey ${this.nickname}!,</p>
                      <p>Here is your One-Time Password (OTP) to reset your password:</p>
                      <p style="font-size: 24px; font-weight: bold; background-color: #f3f3f3; display: inline-block; padding: 10px 20px; border-radius: 5px;">
                        <span style="color: #9146FF;">${this.token}</span>
                      </p>
                      <p>This OTP is valid for the next 1 minute. Do not share this code with anyone.</p>
                      <hr style="border: none; border-top: 1px solid #ddd;">
                      <p style="font-size: 12px; color: gray;">© 2025 Twitch, All Rights Reserved</p>
                      <p style="font-size: 12px; color: gray;">350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA</p>
                    </div>
                  </body>
                </html>
            """;



    private MailTemplateConstant(){}
}
