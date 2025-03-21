package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.CourseDependency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseDependencyRepository extends JpaRepository<CourseDependency, Integer> {
}
