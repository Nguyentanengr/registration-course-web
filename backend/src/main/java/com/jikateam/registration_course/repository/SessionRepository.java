package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.entity.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.support.SessionStatus;


import java.util.List;
import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Integer> {

    @EntityGraph(attributePaths = {"clazz", "course"})
    @Query("SELECT s FROM Session s WHERE s.sessionId = :sessionId")
    Optional<Session> findByIdWithCourseAndClass(Integer sessionId);

    @EntityGraph(attributePaths = {"clazz", "course", "schedules", "schedules.place"
            , "schedules.teacher", "schedules.teacher.courses"})
    @Query("SELECT s FROM Session s WHERE s.sessionId = :sessionId")
    Optional<Session> findSessionForUpdate(Integer sessionId);

    @EntityGraph(attributePaths = {"openSessionRegistration"})
    @Query("SELECT s FROM Session s WHERE s.sessionId = :sessionId")
    Optional<Session> findSessionWithOpenSession(Integer sessionId);

    @EntityGraph(attributePaths = {"openSessionRegistration"})
    @Query("SELECT s FROM Session s WHERE s.sessionId IN :ids")
    List<Session> findAllSessionWithOpenSessionByIds(List<Integer> ids);


    @Query(
            "SELECT s FROM Session s " +
                    "LEFT JOIN FETCH s.openSessionRegistration osr " +
                    "LEFT JOIN FETCH s.schedules " +
                    "LEFT JOIN FETCH s.course c " +
                    "WHERE " +
                    "(:searchKey IS NULL OR " +
                    "s.clazz.clazzId LIKE CONCAT('%', :searchKey, '%') OR " +
                    "s.course.courseId LIKE CONCAT('%', :searchKey, '%') OR " +
                    "s.course.courseName LIKE CONCAT('%', :searchKey, '%')) AND " +
                    "(:year IS NULL OR s.year = :year) AND " +
                    "(:semester IS NULL OR s.semester = :semester) AND " +
                    "(:clazzId IS NULL OR s.clazz.clazzId = :clazzId) AND " +
                    "(:courseId IS NULL OR s.course.courseId = :courseId) AND " +
                    "(:status IS NULL OR " +
                    "(:status = 7 AND (osr IS NULL OR osr.status = 0)) OR " + // lấy trạng thái: create, pending
                    "(:status = 4 AND CAST(osr.status AS integer) IN (4, 5, 6)) OR " + // lấy các trạng thái: comfirm, teaching, completed
                    "(:status = 1 AND CAST(osr.status AS integer) IN (1, 2)) OR " + // lấy các trạng thái: open, close
                    "(:status = 3 AND CAST(osr.status AS integer) IN (3)))" // lấy trạng thái: cancel
    )
    Page<Session> findAllSessionByFilter(
            @Param("searchKey") String searchKey,
            @Param("year") Integer year,
            @Param("semester") Integer semester,
            @Param("clazzId") String clazzId,
            @Param("courseId")String courseId,
            @Param("status") Integer status,
            Pageable pageable
    );

    @Query(
            "SELECT COUNT(s) FROM Session s " +
                    "LEFT JOIN OpenSessionRegistration osr ON s.sessionId = osr.session.sessionId " +
                    "WHERE " +
                    "(:searchKey IS NULL OR " +
                    "s.clazz.clazzId LIKE CONCAT('%', :searchKey, '%') OR " +
                    "s.course.courseId LIKE CONCAT('%', :searchKey, '%') OR " +
                    "s.course.courseName LIKE CONCAT('%', :searchKey, '%')) AND " +
                    "(:year IS NULL OR s.year = :year) AND " +
                    "(:semester IS NULL OR s.semester = :semester) AND " +
                    "(:clazzId IS NULL OR s.clazz.clazzId = :clazzId) AND " +
                    "(:courseId IS NULL OR s.course.courseId = :courseId) AND " +
                    "(:status IS NULL OR " +
                    "(:status = 7 AND osr IS NULL) OR " +
                    "(:status != 7 AND CAST(osr.status AS integer) = :status))"
    )
    long countSessionsByFilter(
            @Param("searchKey") String searchKey,
            @Param("year") Integer year,
            @Param("semester") Integer semester,
            @Param("clazzId") String clazzId,
            @Param("courseId") String courseId,
            @Param("status") Integer status
    );


    @Query("SELECT s FROM Session s " +
            "LEFT JOIN FETCH s.openSessionRegistration osr " +
            "WHERE " +
            "(:searchKey IS NULL OR s.clazz.clazzId LIKE %:searchKey% " +
            "OR s.course.courseId LIKE %:searchKey% " +
            "OR s.course.courseName LIKE %:searchKey%) " +
            "AND (:year IS NULL OR s.year = :year) " +
            "AND (:semester IS NULL OR s.semester = :semester) " +
            "AND (:clazzId IS NULL OR s.clazz.clazzId = :clazzId) " +
            "AND s.startDate > CURRENT_TIMESTAMP " +
            "AND osr IS NULL " +
            "ORDER BY s.startDate DESC"
    )
    List<Session> findAllAbleSessionByFilter(
            @Param("searchKey") String searchKey,
            @Param("year") Integer year,
            @Param("semester") Integer semester,
            @Param("clazzId") String clazzId
    );


    @Query("SELECT s FROM Session s " +
            "LEFT JOIN OpenSessionRegistration osr ON osr.session = s " +
            "WHERE s.sessionId IN :sessionIds " +
            "AND s.startDate > CURRENT_TIMESTAMP " +
            "AND osr IS NULL "
    )
    List<Session> findAllValidSessionToOpenByIds(@Param("sessionIds") Iterable<Integer> sessionIds);


    @Query("SELECT o.status FROM Session s " +
            "LEFT JOIN s.openSessionRegistration o " +
            "WHERE s.sessionId = :sessionId")
    RegistrationStatus findStatusById(@Param("sessionId") Integer sessionId); // return null if no one record

    @Query("SELECT s.sessionId, o.status FROM Session s " +
            "LEFT JOIN s.openSessionRegistration o " +
            "WHERE s.sessionId IN :sessionIds")
    List<Object[]> findStatusByIds(@Param("sessionIds") List<Integer> sessionIds);
}
