package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
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


    @Query("SELECT o.openSessionRegistrationId " +
            "FROM Enrollment e " +
            "JOIN e.openSessionRegistration o " +
            "JOIN e.student s " +
            "JOIN s.account a " +
            "WHERE a.accountId = :accountId AND o.openSessionRegistrationId IN :openSessionIds AND e.status = 0")
    List<Integer> getIfRegistered(
            @Param("openSessionIds") Iterable<Integer> openSessionIds,
            @Param("accountId") Integer accountId
    );


    @Query("SELECT SUM(c.credits) FROM Enrollment e " +
            "JOIN e.openSessionRegistration o " +
            "JOIN o.session s " +
            "JOIN s.course c " +
            "WHERE e.student.studentId = :studentId AND e.isPassed = true")
    Long getAccumulateCreditsByStudentId(@Param("studentId") String studentId);


    @Procedure(procedureName = "RegisterCourse")
    String register(Integer openSessionId, String studentId);

    @Procedure(procedureName = "CancelCourseRegistration")
    String cancel(Integer openSessionId, String studentId);

}
