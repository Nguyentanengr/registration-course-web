package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.CourseDependency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseDependencyRepository extends JpaRepository<CourseDependency, Integer> {


    @Query("SELECT DISTINCT cd.course.courseId " +
            "FROM CourseDependency cd " +
            "WHERE cd.course.courseId IN :courseIds " +
            "AND NOT EXISTS ( " +
            "SELECT 1 " +
            "FROM Enrollment e " +
            "JOIN e.openSessionRegistration osr " +
            "JOIN osr.session s " +
            "JOIN s.course c " +
            "JOIN e.student st " +
            "JOIN st.account a " +
            "WHERE a.accountId = :accountId " +
            "AND e.isPassed = true " +
            "AND c.courseId = cd.requiredCourse.courseId " +
            ")"
    )
    List<String> getPrerequisites(
            @Param("courseIds") Iterable<String> courseIds,
            @Param("accountId") Integer accountId
    );

}
