package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.Teacher;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {

    @EntityGraph(attributePaths = {"courses"})
    List<Teacher> findByTeacherIdIn(Set<String> ids);
}
