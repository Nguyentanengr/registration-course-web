package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {


    // Chỉ được lấy danh sách đăng kí khi lớp học phần ở trạng thái đã được xác nhận
    @Query("SELECT e.student, e.enrollTime FROM Enrollment e " +
            "JOIN e.openSessionRegistration o " +
            "WHERE o.openSessionRegistrationId = :openSessionId AND o.status IN (4, 5, 6)")
    List<Object[]> getAllByOpenSessionId(@Param("openSessionId") Integer openSessionId);
}


