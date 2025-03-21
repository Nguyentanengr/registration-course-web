package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
}
