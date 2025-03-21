package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.RegistrationPhase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationPhaseRepository extends JpaRepository<RegistrationPhase, Integer> {
}
