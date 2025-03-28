package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.StudyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyPlanRepository extends JpaRepository<StudyPlan, Integer> {


    @Query("SELECT COUNT(c) > 0 FROM Course c " +
            "JOIN c.studyPlanDetails spd " +
            "JOIN spd.studyPlan sp " +
            "JOIN Clazz cl ON sp.educationProgram = cl.educationProgram AND sp.specialization = cl.specialization " +
            "WHERE cl.clazzId = :clazzId " +
            "AND spd.semester = :semester " +
            "AND spd.year = :year " +
            "AND c.courseId = :courseId")
    boolean existsCourseInStudyPlan(
            @Param("courseId") String courseId,
            @Param("clazzId") String clazzId,
            @Param("semester") Integer semester, // 2
            @Param("year") Integer year //3
    );


    @Query("SELECT COUNT(c) > 0 FROM Course c " +
            "JOIN c.studyPlanDetails spd " +
            "JOIN spd.studyPlan sp " +
            "JOIN Clazz cl ON sp.educationProgram = cl.educationProgram AND sp.specialization = cl.specialization " +
            "WHERE cl.clazzId = :clazzId " +
            "AND spd.year = :year " +
            "AND c.courseId = :courseId")
    boolean existsCourseInStudyPlan(
            @Param("courseId") String courseId,
            @Param("clazzId") String clazzId,
            @Param("year") Integer year //3
    );
}
