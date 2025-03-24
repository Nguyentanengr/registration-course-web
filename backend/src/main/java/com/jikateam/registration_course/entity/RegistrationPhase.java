package com.jikateam.registration_course.entity;

import com.jikateam.registration_course.constant.PhaseType;
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

    @Column(name = "open_time", nullable = false)
    private LocalDateTime openTime;

    @Column(name = "close_time", nullable = false)
    private LocalDateTime closeTime;

    @Column(name = "type", nullable = false)
    private PhaseType type;

    @OneToMany(mappedBy = "registrationPhase")
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
