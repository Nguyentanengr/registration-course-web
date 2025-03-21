package com.jikateam.registration_course.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class EnrollmentId implements Serializable {

    private Integer openSessionRegistrationId;
    private String studentId;

}
