package com.jikateam.registration_course.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;


@Getter
@AllArgsConstructor
public enum CodeResponse {

    SUCCESS(1000, HttpStatus.OK, ""),
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
    DELETE_PHASE_SUCCESSFULLY(1000, HttpStatus.OK, "Delete a phase successfully"),
    DELETE_PHASE_LIST_SUCCESSFULLY(1000, HttpStatus.OK, "Delete a phase list successfully"),
    CREATE_OPEN_SESSION_SUCCESSFULLY(1000, HttpStatus.OK, "Create a open session list successfully"),
    DELETE_OPEN_SESSION_SUCCESSFULLY(1000, HttpStatus.OK, "Delete a open session list successfully"),
    UPDATE_OPEN_SESSION_STATUS_SUCCESSFULLY(1000, HttpStatus.OK, "Update a open session status successfully"),



    SCHEDULE_CONFLICT(9115, HttpStatus.CONFLICT, "Conflict schedules"),
    SESSION_IS_FULL(9113, HttpStatus.CONFLICT, "Session is full"),
    PREREQUISITE_NOT_MET(9111, HttpStatus.CONFLICT, "Conflict prerequisite"),
    STUDENT_NOT_FOUND(9109, HttpStatus.BAD_REQUEST, "Student does not exist"),
    DISSATISFIED_SESSION_IN_PHASE(9107, HttpStatus.BAD_REQUEST, "Dissatisfied about session in this phase"),
    INVALID_FILTER_TYPE(9105, HttpStatus.BAD_REQUEST, "Invalid filter type for get open session"),
    INVALID_PREVIOUS_STATUS(9103, HttpStatus.BAD_REQUEST, "Not eligible about status for update"),
    OPEN_SESSION_NOT_FOUND(9101, HttpStatus.NOT_FOUND, "Open session does not exist"),
    SESSIONS_NOT_PROVIDED(9099, HttpStatus.BAD_REQUEST, "Open session list is not provided"),
    OPEN_SESSIONS_CANNOT_DELETE(9099, HttpStatus.BAD_REQUEST, "One of the open sessions is not ready for deletion"),
    OPEN_SESSION_CANNOT_DELETE(9097, HttpStatus.BAD_REQUEST, "Open session cannot delete"),
    INVALID_MANAGER_TO_OPEN(9095, HttpStatus.CONFLICT, "One of the managers is invalid"),
    INVALID_PHASE_TO_OPEN(9093, HttpStatus.CONFLICT, "One of the registration phases is invalid"),
    INVALID_SESSION_TO_OPEN(9091, HttpStatus.CONFLICT, "One of the sessions is invalid"),
    MANAGER_ID_IS_BLANK(9089, HttpStatus.BAD_REQUEST, "Manager id cannot be blank"),
    REGISTRATION_PHASE_ID_IS_BLANK(9087, HttpStatus.BAD_REQUEST, "Registration phase id cannot be blank"),
    SESSION_ID_IS_BLANK(9085, HttpStatus.BAD_REQUEST, "Session cannot be blank"),
    PHASES_NOT_PROVIDED(9083, HttpStatus.CONFLICT, "Phase is not provided"),
    PHASE_CONTAINS_OPEN_SESSION(9081, HttpStatus.CONFLICT, "Phase is open for session"),
    PHASE_NOT_FOUND(9079, HttpStatus.NOT_FOUND, "Phase does not exist"),
    PHASE_TIME_OVERLAPPING(9077, HttpStatus.CONFLICT, "Phase time is conflict with another"),
    INVALID_TIME_DURATION(9075, HttpStatus.CONFLICT, "Phase close time and open time is conflict"),
    PHASE_TIME_IN_PAST(9073, HttpStatus.CONFLICT, "Registration phase time must be in future"),
    PHASE_TYPE_IS_BLANK(9071, HttpStatus.BAD_REQUEST, "Registration phase type cannot be blank"),
    PHASE_NAME_IS_BLANK(9069, HttpStatus.BAD_REQUEST, "Registration phase name cannot be blank"),
    PHASE_NAME_IS_EXIST(9067, HttpStatus.CONFLICT, "Registration phase name is exist"),
    SCHEDULE_NOT_FOUND(9065, HttpStatus.NOT_FOUND, "Schedule does not exist"),
    SESSION_IS_CONFLICT(9063, HttpStatus.CONFLICT, "Session is opening for register or teaching"),
    SESSION_NOT_FOUND(9061, HttpStatus.NOT_FOUND, "Session does not exist"),
    DISSATISFIED_SCHEDULE(9059, HttpStatus.CONFLICT, "Dissatisfied time for schedule"),
    DISSATISFIED_TEACHER(9057, HttpStatus.CONFLICT, "Dissatisfied teacher for schedule or course"),
    NO_SESSION_DATE_PROVIDED(9054, HttpStatus.CONFLICT, "No session date provided"),
    DISSATISFIED_CAPACITY(9051, HttpStatus.CONFLICT, "Dissatisfied capacity of place"),
    DISSATISFIED_COURSE(9051, HttpStatus.CONFLICT, "Dissatisfied course for class' study plan"),
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
