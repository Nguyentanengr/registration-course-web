package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {


    @Query("SELECT DISTINCT c FROM Course c " +
            "JOIN c.studyPlanDetails spd " +
            "JOIN spd.studyPlan sp " +
            "JOIN Clazz cl ON sp.educationProgram = cl.educationProgram AND sp.specialization = cl.specialization " +
            "WHERE (:searchKey IS NULL OR :searchKey = '' " +
            "OR c.courseId LIKE CONCAT('%', :searchKey, '%') " +
            "OR c.courseName LIKE CONCAT('%', :searchKey, '%')) " +
            "AND (:classId IS NULL OR :year IS NULL OR :semester IS NULL " +
            "OR (cl.clazzId = :classId AND spd.semester = :semester AND spd.year = (:year - cl.startYear) + 1))")
    List<Course> getAllByFilter(
            @Param("searchKey") String searchKey,
            @Param("classId") String classId,
            @Param("year") Integer year,
            @Param("semester") Integer semester
    );



    @Query("SELECT c FROM Course c " +
            "WHERE (:searchKey IS NULL OR :searchKey = '' OR c.courseName LIKE CONCAT('%', :searchKey, '%') " +
            "OR c.courseId LIKE CONCAT('%', :searchKey, '%'))")
    List<Course> getAllBySearchKey(
            @Param("searchKey") String searchKey
    );
}

