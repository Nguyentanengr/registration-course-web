package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.constant.TeacherStatus;
import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.Teacher;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {

    @EntityGraph(attributePaths = {"courses", "schedules"})
    List<Teacher> findByTeacherIdIn(Set<String> ids);

    @Query("SELECT DISTINCT t FROM Teacher t " +
            "LEFT JOIN t.courses tc " +
            "WHERE (:searchKey IS NULL OR t.fullname LIKE %:searchKey% OR t.teacherId LIKE %:searchKey%) " +
            "AND (:courseId IS NULL OR tc.courseId = :courseId) " +
            "AND (:status IS NULL OR t.status = :status)")
    List<Teacher> findTeacherByFilter(
            @Param("searchKey") String searchKey,
            @Param("courseId") String courseId,
            @Param("status") TeacherStatus status
    );
}
