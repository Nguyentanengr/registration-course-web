package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.constant.DayOfWeek;
import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

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
    boolean isConflictScheduleOnTeacher(@Param("teacherId") String teacherId,
                                        @Param("dayOfWeek") DayOfWeek dayOfWeek,
                                        @Param("endPeriod") Integer endPeriod,
                                        @Param("startPeriod") Integer startPeriod,
                                        @Param("startDate") LocalDate startDate,
                                        @Param("endDate") LocalDate endDate);
}
