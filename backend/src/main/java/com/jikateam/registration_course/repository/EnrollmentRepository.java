package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {


    @Query("SELECT o.openSessionRegistrationId, COUNT(e) FROM Enrollment e " +
            "JOIN e.openSessionRegistration o " +
            "WHERE o.openSessionRegistrationId IN :openSessionIds AND e.status = 0" +
            "GROUP BY o.openSessionRegistrationId"
    )
    List<Object[]> getNumberOfRegisterOnOpenSessions(
            @Param("openSessionIds") Iterable<Integer> openSessionIds
    );


}
