package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.RegistrationPhase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PhaseRepository extends JpaRepository<RegistrationPhase, Integer> {

    boolean existsByRegistrationPhaseName(String name);


    @Query("SELECT COUNT(*) > 0 FROM RegistrationPhase p " +
            "WHERE p.registrationPhaseName = :name AND p.registrationPhaseId != :excludeId")
    boolean existsByRegistrationPhaseNameExcludingId(
            @Param("name") String name,
            @Param("excludeId") Integer excludeId
    );

    @Query(
            "SELECT COUNT(p) > 0 FROM RegistrationPhase p " +
            "WHERE p.openTime < :newCloseTime AND p.closeTime > :newOpenTime"
    )
    boolean existsOverlappingPhase(
            @Param("newOpenTime") LocalDateTime openTime,
            @Param("newCloseTime") LocalDateTime closeTime
    );

    @Query(
            "SELECT COUNT(p) > 0 FROM RegistrationPhase p " +
            "WHERE p.openTime < :newCloseTime AND p.closeTime > :newOpenTime " +
            "AND p.registrationPhaseId != :excludeId"
    )
    boolean existsOverlappingPhaseExcludingId(
            @Param("newOpenTime") LocalDateTime openTime,
            @Param("newCloseTime") LocalDateTime closeTime,
            @Param("excludeId") Integer excludeId
    );


    @Query(
            "SELECT p FROM RegistrationPhase p " +
            "LEFT JOIN p.openSessionRegistrations " +
            "WHERE p.registrationPhaseId = :phaseId"
    )
    Optional<RegistrationPhase> findByIdWithOpenSession(
            @Param("phaseId") Integer phaseId
    );


    @Query(
            "SELECT p FROM RegistrationPhase p " +
            "LEFT JOIN p.openSessionRegistrations " +
            "WHERE p.registrationPhaseId IN :phaseIds"
    )
    List<RegistrationPhase> findAllByIdWithOpenSession
            (@Param("phaseIds") List<Integer> phaseIds);

    @Query(
            "SELECT p FROM RegistrationPhase p " +
            "WHERE (%:searchKey% IS NULL OR %:searchKey% = '' OR p.registrationPhaseName LIKE %:searchKey%) " +
            "AND (:semester IS NULL OR p.semester = :semester) " +
            "AND (:year IS NULL OR (:year BETWEEN YEAR(p.openTime) AND YEAR(p.closeTime))) " +
            "ORDER BY p.registrationPhaseId ASC"
    )
    List<RegistrationPhase> findAllByFilter(
            @Param("searchKey") String searchKey,
            @Param("semester") Integer semester,
            @Param("year") Integer year
    );

    @Query("SELECT p FROM RegistrationPhase p " +
            "WHERE p.registrationPhaseId IN :phaseIds " +
            "AND p.openTime > CURRENT_TIMESTAMP"
    )
    List<RegistrationPhase> findAllValidPhaseToOpen(@Param("phaseIds") Iterable<Integer> phaseIds);


    @Query(value = "SELECT * FROM registration_phase " +
            "WHERE open_time <= CURRENT_TIMESTAMP " +
            "ORDER BY open_time DESC LIMIT 1", nativeQuery = true)
    RegistrationPhase findLatest();

}
