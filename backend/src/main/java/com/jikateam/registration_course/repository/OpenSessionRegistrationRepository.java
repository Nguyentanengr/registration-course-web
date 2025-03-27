package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OpenSessionRegistrationRepository extends JpaRepository<OpenSessionRegistration, Integer> {

    @Query("SELECT COUNT(o) > 0 FROM OpenSessionRegistration o WHERE o.session.sessionId = :sessionId")
    boolean existBySession(@Param("sessionId") Integer sessionId);



    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN FETCH o.session s " +
            "JOIN FETCH s.course c " +
            "JOIN s.clazz cl " +
            "JOIN FETCH o.registrationPhase p " +
//            "LEFT JOIN FETCH o.enrollments " +
            "WHERE (:searchKey IS NULL OR :searchKey = '' " +
            "OR c.courseId LIKE %:searchKey% " +
            "OR c.courseName LIKE %:searchKey% " +
            "OR cl.clazzId LIKE %:searchKey%) " +
            "AND (:phaseId IS NULL OR p.registrationPhaseId = :phaseId) " +
            "AND (:clazzId IS NULL OR cl.clazzId = :clazzId) " +
            "ORDER BY cl.clazzId")
    List<OpenSessionRegistration> getAllByPhaseAndClass(
            @Param("searchKey") String searchKey,
            @Param("phaseId") Integer phaseId,
            @Param("clazzId") String clazzId
    );


    @Query(
            "SELECT COUNT(o) > 0 FROM OpenSessionRegistration o " +
                    "WHERE o.openSessionRegistrationId IN :openSessionIds " +
                    "AND o.status != :status"
    )
    boolean existOpenSessionInListViolateStatus(
            @Param("openSessionIds") Iterable<Integer> openSessionIds,
            @Param("status") RegistrationStatus status);


    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN o.registrationPhase r " +
            "WHERE o.status = 0 " +
            "AND r.openTime <= :currentTime"

    )
    List<OpenSessionRegistration> findPendingSessionsToOpen
            (@Param("currentTime") LocalDateTime now);


    @Modifying
    @Transactional
    @Query("UPDATE OpenSessionRegistration o SET o.status = :status " +
            "WHERE o.openSessionRegistrationId IN :pendingIds"
    )
    void updateStatusByIds(Iterable<Integer> pendingIds, RegistrationStatus status);


    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN o.registrationPhase r " +
            "WHERE o.status = 1 " +
            "AND r.closeTime <= :currentTime")
    List<OpenSessionRegistration> findOpeningSessionsToClose
            (@Param("currentTime") LocalDateTime now);

}
