package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, String> {

    @Query("SELECT m FROM Manager m " +
            "WHERE m.managerId IN :managerIds")
    List<Manager> findAllActiveManagerByIds(@Param("managerIds") Iterable<String> managerIds);
}
