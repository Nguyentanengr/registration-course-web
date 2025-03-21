package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.Session;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Integer> {

    @EntityGraph(attributePaths = {"clazz", "course"})
    @Query("SELECT s FROM Session s WHERE s.sessionId = :sessionId")
    Optional<Session> findByIdWithCourseAndClass(Integer sessionId);

    @EntityGraph(attributePaths = {"clazz", "course", "schedules", "schedules.place", "schedules.teacher", "schedules.teacher.courses"})
    @Query("SELECT s FROM Session s WHERE s.sessionId = :sessionId")
    Optional<Session> findSessionForUpdate(Integer sessionId);
}
