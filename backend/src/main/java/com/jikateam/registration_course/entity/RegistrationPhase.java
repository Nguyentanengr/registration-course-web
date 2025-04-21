package com.jikateam.registration_course.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "registration_phase")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationPhase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registration_phase_id")
    private Integer registrationPhaseId;

    @Column(name = "registration_phase_name", nullable = false, length = 255)
    private String registrationPhaseName;

    @Column(nullable = false)
    private Integer semester; // 1, 2, 3

    @Column(nullable = false)
    private Integer year; // 2025,...

    @Column(name = "open_time", nullable = false)
    private LocalDateTime openTime;

    @Column(name = "close_time", nullable = false)
    private LocalDateTime closeTime;

    @OneToMany(mappedBy = "registrationPhase", cascade = CascadeType.REMOVE)
    private Set<OpenSessionRegistration> openSessionRegistrations;

    @Override
    public String toString() {
        return "RegistrationPhase{" +
                "registrationPhaseId=" + registrationPhaseId +
                ", registrationPhaseName='" + registrationPhaseName + '\'' +
                ", openTime=" + openTime +
                ", closeTime=" + closeTime +
                '}';
    }
}
