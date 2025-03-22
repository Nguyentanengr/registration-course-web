package com.jikateam.registration_course.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;


@Getter
@AllArgsConstructor
public enum CodeResponse {

    USER_CREATED(1000, HttpStatus.OK, ""),
    REGISTER_SUCCESSFULLY(1000, HttpStatus.OK, "Register account successfully"),
    EMAIL_HAS_BEEN_SEND(1000, HttpStatus.OK, "Email has been sent"),
    LOGIN_SUCCESSFULLY(1000, HttpStatus.OK, "Login successfully"),
    REFRESH_TOKEN_SUCCESSFULLY(1000, HttpStatus.OK, "Refresh token successfully"),
    LOGOUT_SUCCESSFULLY(1000, HttpStatus.OK, "Logout successfully"),
    RESET_PASSWORD_SUCCESSFULLY(1000, HttpStatus.OK, "Reset password successfully"),
    CREATE_SESSION_SUCCESSFULLY(1000, HttpStatus.OK, "Create a session successfully"),
    UPDATE_SESSION_SUCCESSFULLY(1000, HttpStatus.OK, "Update a session successfully"),
    DELETE_SESSION_SUCCESSFULLY(1000, HttpStatus.OK, "Delete a session successfully"),


    SCHEDULE_NOT_FOUND(9065, HttpStatus.CONFLICT, "Schedule does not exist"),
    SESSION_IS_CONFLICT(9063, HttpStatus.CONFLICT, "Session is opening for register or teaching"),
    SESSION_NOT_FOUND(9061, HttpStatus.NOT_FOUND, "Session does not exist"),
    DISSATISFIED_SCHEDULE(9059, HttpStatus.CONFLICT, "Dissatisfied time for schedule"),
    DISSATISFIED_TEACHER(9057, HttpStatus.CONFLICT, "Dissatisfied teacher for schedule or course"),
    NO_SESSION_DATE_PROVIDED(9054, HttpStatus.CONFLICT, "No session date provided"),
    DISSATISFIED_CAPACITY(9051, HttpStatus.CONFLICT, "Dissatisfied capacity of place"),
    INVALID_TEACHER_FOR_COURSE(9049, HttpStatus.CONFLICT, "Teacher is not matches"),
    TEACHER_NOT_FOUND(9047, HttpStatus.NOT_FOUND, "Teacher does not exist"),
    PLACE_NOT_FOUND(9045, HttpStatus.NOT_FOUND, "Place does not exist"),
    COURSE_NOT_FOUND(9043, HttpStatus.NOT_FOUND, "Course does not exist"),
    CLASS_NOT_FOUND(9041, HttpStatus.NOT_FOUND, "Class does not exist"),
    ACCOUNT_NON_EXIST(9039, HttpStatus.UNAUTHORIZED, "Account does not exist"),
    AMBIGUOUS_TOKEN(9037, HttpStatus.BAD_REQUEST, "Refresh token not found in cookie"),
    OTP_INVALID_SIZE(9035, HttpStatus.BAD_REQUEST, "OTP must be exactly 6 digits"),
    OTP_IS_BLANK(9035, HttpStatus.BAD_REQUEST, "OTP cannot be blank"),
    PASSWORD_NO_STRONG(9033, HttpStatus.BAD_REQUEST, "Password must be stronger. Try using a mix of uppercase, lowercase, numbers, and symbols"),
    PASSWORD_INVALID_SIZE(9031, HttpStatus.BAD_REQUEST, "Password cannot be too long or too short"),
    PASSWORD_IS_BLANK(9029, HttpStatus.BAD_REQUEST, "Password cannot be blank"),
    JWT_TOKEN_IS_BLANK(9027, HttpStatus.BAD_REQUEST, "Token cannot be blank"),
    EMAIL_INVALID_FORMAT(9025, HttpStatus.BAD_REQUEST, "Invalid email format"),
    EMAIL_INVALID_SIZE(9023, HttpStatus.BAD_REQUEST, "Email cannot be too long or too short"),
    EMAIL_IS_BLANK(9021, HttpStatus.BAD_REQUEST, "Email cannot be blank"),
    INVALID_REFRESH_TOKEN(9019, HttpStatus.BAD_REQUEST, "Refresh token is invalid or expired"),
    LOGIN_FAIL(9017, HttpStatus.UNAUTHORIZED, "Login failed"),
    ACCOUNT_HAS_BEEN_LOCKED(9015, HttpStatus.UNAUTHORIZED, "Account has been locked"),
    JWT_TOKEN_CANNOT_GENERATE(9013, HttpStatus.BAD_REQUEST, "An error occurred while serialize jwt object"),
    ROLE_NOT_FOUND(9011, HttpStatus.NOT_FOUND, "Could not find role by name: USER"),
    OTP_INCORRECT_OR_EXPIRED(9009, HttpStatus.BAD_REQUEST, "OTP is incorrect or expired"),
    EMAIl_NOT_HAVE_ACCOUNT(9007, HttpStatus.BAD_REQUEST, "This email does not have an account"),
    EMAIl_CANNOT_SEND(9005, HttpStatus.BAD_REQUEST, "An error occurred while sending the email"),
    OTP_CANNOT_GENERATE(9003, HttpStatus.BAD_REQUEST, "Cannot generate OTP for email in this time"),
    EMAIL_HAS_AN_ACCOUNT(9001, HttpStatus.CONFLICT, "Email already has an account");


    private final long code;
    private final HttpStatusCode status;
    private final String message;

}
