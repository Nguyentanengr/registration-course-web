package com.jikateam.registration_course.entity;

import com.jikateam.registration_course.constant.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "student")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @Column(name = "student_id", length = 12)
    private String studentId;

    @Column(nullable = false, length = 255)
    private String fullname;

    @Column(nullable = false, length = 10)
    private String phone;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "current_semester", nullable = false)
    private Integer currentSemester;

    @Column(name = "current_year", nullable = false)
    private Integer currentYear;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", unique = true)
    private Account account;

    @OneToOne(mappedBy = "student", fetch = FetchType.LAZY, optional = false)
    private ClassEnrollment classEnrollment;

    @OneToMany(mappedBy = "student")
    private Set<SupportRequirement> supportRequirements;

    @OneToMany(mappedBy = "student")
    private Set<Enrollment> enrollments;

}