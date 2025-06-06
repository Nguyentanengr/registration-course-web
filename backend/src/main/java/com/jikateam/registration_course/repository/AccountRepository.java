package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByUsername(String username);

    Optional<Account> findByEmail(String email);
}
