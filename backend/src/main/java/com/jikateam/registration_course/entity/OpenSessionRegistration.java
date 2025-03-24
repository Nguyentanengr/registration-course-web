package com.jikateam.registration_course.entity;

import com.jikateam.registration_course.constant.RegistrationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "open_session_registration")
public class OpenSessionRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "open_session_registration_id")
    private Integer openSessionRegistrationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    private Session session;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private RegistrationStatus status; // 0: pending, 1: open, 2: close, 3: cancel, 4: conform

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Manager manager;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registration_phase_id")
    private RegistrationPhase registrationPhase;

    @OneToMany(mappedBy = "openSessionRegistration")
    private Set<Enrollment> enrollments;

    @Override
    public String toString() {
        return "OpenSessionRegistration{" +
                "openSessionRegistrationId=" + openSessionRegistrationId +
                ", createdAt=" + createdAt +
                ", status=" + status +
                '}';
    }
}
