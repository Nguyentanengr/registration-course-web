package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.RegistrationPhase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface RegistrationPhaseRepository extends JpaRepository<RegistrationPhase, Integer> {


    @Query("SELECT p FROM RegistrationPhase p " +
            "WHERE p.openTime <= :currentTime AND p.closeTime >= :currentTime " +
            "AND p.year = :year AND p.semester = :semester")
    RegistrationPhase getOpenPhaseBySemester (
            @Param("year") Integer year,
            @Param("semester") Integer semester,
            @Param("currentTime")LocalDateTime currentTime
            );

    @Query(value = "SELECT * FROM registration_phase p " +
            "WHERE p.close_time < :currentTime " +
            "ORDER BY p.close_time DESC " +
            "LIMIT 1",
            nativeQuery = true)
    RegistrationPhase findMostRecentClosedPhase(
            @Param("currentTime") LocalDateTime currentTime
    );
}
