package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.constant.DayOfWeek;
import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {


    @Query("SELECT COUNT(s) > 0 " +
            "FROM Schedule s " +
            "WHERE s.teacher.teacherId = :teacherId " +
            "AND s.dayOfWeek = :dayOfWeek " +
            "AND s.startPeriod <= :endPeriod " +
            "AND s.endPeriod >= :startPeriod " +
            "AND s.startDate <= :endDate " +
            "AND s.endDate >= :startDate"
    )
    boolean isConflictScheduleOnTeacher(
            @Param("teacherId") String teacherId,
            @Param("dayOfWeek") DayOfWeek dayOfWeek,
            @Param("endPeriod") Integer endPeriod,
            @Param("startPeriod") Integer startPeriod,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );


    @Query("SELECT s FROM Schedule s " +
            "JOIN FETCH s.session s2 " +
            "JOIN FETCH s2.course c " +
            "JOIN FETCH s.place p " +
            "JOIN FETCH s.teacher t " +
            "JOIN s2.openSessionRegistration o " +
            "JOIN o.enrollments e " +
            "WHERE e.student.studentId = :studentId " +
            "AND e.status = 0 " +
            "AND s2.semester = :semester " +
            "AND s2.year = :year")
    List<Schedule> fetchByStudentOnSemesterAndYear(
            @Param("studentId") String studentId,
            @Param("semester") Integer semester,
            @Param("year") Integer year
    );


    @Query("SELECT s FROM Schedule s " +
            "JOIN FETCH s.place p " +
            "JOIN FETCH s.teacher t " +
            "WHERE s.session.id = :sessionId"
    )
    List<Schedule> fetchBySessionId(
            @Param("sessionId") String sessionId
    );


    @Modifying
    @Query("DELETE FROM Schedule s WHERE s.session.sessionId = :sessionId")
    void deleteAllBySessionId(@Param("sessionId") Integer sessionId);


}
