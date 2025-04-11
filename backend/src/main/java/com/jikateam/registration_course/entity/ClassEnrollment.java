package com.jikateam.registration_course.entity;

import com.jikateam.registration_course.constant.ClassEnrollmentStatus;
import jakarta.persistence.*;
import lombok.*;

// ClassEnrollment.java
@Entity
@Table(name = "class_enrollment")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassEnrollment {
    @Id
    @Column(name = "student_id", length = 12)
    private String studentId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Clazz classEntity;

    @Column(nullable = false)
    private ClassEnrollmentStatus status; // 0: enrolled, 1: completed, 2: drop out

}
