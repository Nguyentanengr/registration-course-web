package com.jikateam.registration_course.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "session")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private Integer sessionId;

    @Column(name = "group_number", nullable = false)
    private Integer groupNumber;

    @Column(nullable = false)
    private Integer semester;

    @Column(nullable = false)
    private Integer year;

    @Column(name = "max_students", nullable = false)
    private Integer maxStudents = 100;

    @Column(name = "min_students", nullable = false)
    private Integer minStudents = 0;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Clazz clazz;

    @OneToMany(mappedBy = "session")
    private Set<Schedule> schedules;

    @OneToOne(mappedBy = "session", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private OpenSessionRegistration openSessionRegistration;

    @Override
    public String toString() {
        return "Session{" +
                "sessionId=" + sessionId +
                ", groupNumber=" + groupNumber +
                ", semester=" + semester +
                ", year=" + year +
                ", maxStudents=" + maxStudents +
                ", minStudents=" + minStudents +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }

}