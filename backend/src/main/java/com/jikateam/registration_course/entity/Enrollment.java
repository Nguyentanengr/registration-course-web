package com.jikateam.registration_course.entity;

import com.jikateam.registration_course.constant.EnrollmentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "enrollment")
public class Enrollment {

    @EmbeddedId
    private EnrollmentId id;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @MapsId("openSessionRegistrationId")
    @JoinColumn(name = "open_session_registration_id")
    private OpenSessionRegistration openSessionRegistration;

    @Column(name="enroll_time", nullable = false)
    private LocalDateTime enrollTime;

    @Column(nullable = false)
    private EnrollmentStatus status;

    @Column(nullable = false, name = "is_passed")
    Boolean isPassed;
}