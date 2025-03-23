package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.constant.SessionStatus;
import com.jikateam.registration_course.entity.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Integer> {

    @EntityGraph(attributePaths = {"clazz", "course"})
    @Query("SELECT s FROM Session s WHERE s.sessionId = :sessionId")
    Optional<Session> findByIdWithCourseAndClass(Integer sessionId);

    @EntityGraph(attributePaths = {"clazz", "course", "schedules", "schedules.place", "schedules.teacher", "schedules.teacher.courses"})
    @Query("SELECT s FROM Session s WHERE s.sessionId = :sessionId")
    Optional<Session> findSessionForUpdate(Integer sessionId);

    @EntityGraph(attributePaths = {"openSessionRegistrations"})
    @Query("SELECT s FROM Session s WHERE s.sessionId = :sessionId")
    Optional<Session> findSessionWithOpenSession(Integer sessionId);

    @EntityGraph(attributePaths = {"openSessionRegistrations"})
    @Query("SELECT s FROM Session s WHERE s.sessionId IN :ids")
    List<Session> findAllSessionWithOpenSessionByIds(List<Integer> ids);


    @Query(
            "SELECT s FROM Session s WHERE " +
                    "(:searchKey IS NULL OR s.clazz.clazzId LIKE %:searchKey% OR " +
                    "s.course.courseId LIKE %:searchKey% OR " +
                    "s.course.courseName LIKE %:searchKey%) AND " +
                    "(:year IS NULL OR s.year = :year) AND " +
                    "(:semester IS NULL OR s.semester = :semester) AND " +
                    "(:clazzId IS NULL OR s.clazz.clazzId = :clazzId) AND " +
                    "(:courseId IS NULL OR s.course.courseId = :courseId) AND " +
                    "(:status IS NULL OR s.status = :status)"
    )
    Page<Session> findAllSessionByFilter(
            @Param("searchKey") String searchKey,
            @Param("year") Integer year,
            @Param("semester") Integer semester,
            @Param("clazzId") String clazzId,
            @Param("courseId")String courseId,
            @Param("status")SessionStatus status,
            Pageable pageable
    );


}
