package com.jikateam.registration_course.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "class")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Clazz {
    @Id
    @Column(name = "class_id", length = 12)
    private String clazzId;

    @Column(name = "number_of_students", nullable = false)
    private Integer numberOfStudents;

    @Column(name = "start_year", nullable = false)
    private Integer startYear;

    @Column(name = "end_year", nullable = false)
    private Integer endYear;

    @Column(name = "current_semester", nullable = false)
    private Integer currentSemester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "education_program_id")
    private EducationProgram educationProgram;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialization_id")
    private Specialization specialization;

    @OneToMany(mappedBy = "classEntity")
    private Set<ClassEnrollment> classEnrollments;

    @OneToMany(mappedBy = "clazz")
    private Set<Session> sessions;

    @Override
    public String toString() {
        return "Class{" +
                "classId='" + clazzId + '\'' +
                ", numberOfStudents=" + numberOfStudents +
                ", startYear=" + startYear +
                ", endYear=" + endYear +
                '}';
    }
}
