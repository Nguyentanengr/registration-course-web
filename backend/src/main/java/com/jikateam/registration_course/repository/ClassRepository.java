package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Clazz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<Clazz, String> {

    @Query("SELECT c FROM Clazz c " +
            "WHERE (:searchKey IS NULL OR :searchKey = '' OR c.clazzId LIKE %:searchKey%) " +
            "AND (:year IS NULL OR c.startYear = :year) " +
            "ORDER BY c.startYear DESC"
    )
    List<Clazz> findAllByFilter(@Param("searchKey") String searchKey, @Param("year") Integer year);
}
