package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Clazz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends JpaRepository<Clazz, String> {
}
