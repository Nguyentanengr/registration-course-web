package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OpenSessionRegistrationRepository extends JpaRepository<OpenSessionRegistration, Integer> {

    @Query("SELECT COUNT(o) > 0 FROM OpenSessionRegistration o WHERE o.session.sessionId = :sessionId")
    boolean existBySession(@Param("sessionId") Integer sessionId);
}
