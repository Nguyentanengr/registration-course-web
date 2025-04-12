package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.constant.RegistrationStatus;
import com.jikateam.registration_course.entity.Account;
import com.jikateam.registration_course.entity.OpenSessionRegistration;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OpenSessionRegistrationRepository extends JpaRepository<OpenSessionRegistration, Integer> {

    @Query("SELECT COUNT(o) > 0 FROM OpenSessionRegistration o WHERE o.session.sessionId = :sessionId")
    boolean existBySession(@Param("sessionId") Integer sessionId);



    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN FETCH o.session s " +
            "JOIN FETCH s.course c " +
            "JOIN s.clazz cl " +
            "JOIN FETCH o.registrationPhase p " +
            "WHERE (:searchKey IS NULL OR :searchKey = '' " +
            "OR c.courseId LIKE %:searchKey% " +
            "OR c.courseName LIKE %:searchKey% " +
            "OR cl.clazzId LIKE %:searchKey%) " +
            "AND (:phaseId IS NULL OR p.registrationPhaseId = :phaseId) " +
            "AND (:clazzId IS NULL OR cl.clazzId = :clazzId) " +
            "AND (o.status IN (0, 1, 2)) " +
            "ORDER BY cl.clazzId")
    List<OpenSessionRegistration> getAllByPhaseAndClass(
            @Param("searchKey") String searchKey,
            @Param("phaseId") Integer phaseId,
            @Param("clazzId") String clazzId
    );

    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN FETCH o.session s " +
            "JOIN FETCH s.course c " +
            "JOIN s.clazz cl " +
            "WHERE (:searchKey IS NULL OR :searchKey = '' " +
            "OR c.courseId LIKE %:searchKey% " +
            "OR c.courseName LIKE %:searchKey% " +
            "OR cl.clazzId LIKE %:searchKey%) " +
            "AND (:clazzId IS NULL OR :clazzId = '' OR cl.clazzId = :clazzId) " +
            "AND (:year IS NULL OR s.year = :year) " +
            "AND (:semester IS NULL OR s.semester = :semester) " +
            "AND (o.status IN (4, 5, 6)) " +
            "ORDER BY cl.clazzId")
    List<OpenSessionRegistration> getAllBySemester(
            @Param("searchKey") String searchKey,
            @Param("clazzId") String clazzId,
            @Param("year") Integer year,
            @Param("semester") Integer semester
    );


    @Query("SELECT COUNT(o) > 0 FROM OpenSessionRegistration o " +
                    "WHERE o.openSessionRegistrationId IN :openSessionIds " +
                    "AND o.status != :status")
    boolean existOpenSessionInListViolateStatus(
            @Param("openSessionIds") Iterable<Integer> openSessionIds,
            @Param("status") RegistrationStatus status);


    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN o.registrationPhase r " +
            "WHERE o.status = 0 " +
            "AND r.openTime <= :currentTime")
    List<OpenSessionRegistration> findPendingSessionsToOpen
            (@Param("currentTime") LocalDateTime now);


    @Modifying
    @Transactional
    @Query("UPDATE OpenSessionRegistration o SET o.status = :status " +
            "WHERE o.openSessionRegistrationId IN :pendingIds")
    void updateStatusByIds(Iterable<Integer> pendingIds, RegistrationStatus status);


    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN o.registrationPhase r " +
            "WHERE o.status = 1 " + // status = OPEN
            "AND r.closeTime <= :currentTime")
    List<OpenSessionRegistration> findOpeningSessionsToClose
            (@Param("currentTime") LocalDateTime now);

    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN o.session s " +
            "WHERE o.status = 4 " + // status = CONFORM
            "AND s.startDate <= :currentDate")
    List<OpenSessionRegistration> findConformSessionToTeach
            (@Param("currentDate") LocalDate now);

    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN o.session s " +
            "WHERE o.status = 5 " + // status = TEACHING
            "AND s.endDate <= :currentDate")
    List<OpenSessionRegistration> findTaughtSessionToTeach
            (@Param("currentDate") LocalDate now);


    // Lấy ra để đăng ký
    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN FETCH o.session s " +
            "JOIN FETCH s.course c " + // fetch eage
            "JOIN FETCH s.schedules sc " + // fetch eage
            "JOIN o.registrationPhase p " +
            "WHERE p.registrationPhaseId = :phaseId " +
            "AND s.clazz.clazzId = :clazzId")
    List<OpenSessionRegistration> getAllByFilterTypeClass(
             @Param("clazzId") String clazzId,
             @Param("phaseId") Integer phaseId
    );

    // lấy ra để xem
    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN FETCH o.session s " +
            "JOIN FETCH s.course c " + // fetch eage
            "JOIN FETCH s.schedules sc " + // fetch eage
            "JOIN o.registrationPhase p " +
            "WHERE p.year = :year AND p.semester = :semester " +
            "AND s.clazz.clazzId = :clazzId")
    List<OpenSessionRegistration> getAllByFilterTypeClassInPrevPhase(
            @Param("clazzId") String clazzId,
            @Param("year") Integer year,
            @Param("semester") Integer semester
    );

    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN FETCH o.session s " +
            "JOIN FETCH s.course c " + // fetch eage
            "JOIN FETCH s.schedules sc " + // fetch eage
            "JOIN o.registrationPhase p " +
            "WHERE p.registrationPhaseId = :phaseId " +
            "AND c.courseId IN " +
            "(SELECT spd.course.courseId FROM StudyPlanDetail spd " +
            "JOIN spd.studyPlan sp " +
            "JOIN Clazz cl ON sp.educationProgram = cl.educationProgram AND sp.specialization = cl.specialization " +
            "WHERE cl.clazzId = :clazzId)")
    List<OpenSessionRegistration> getAllByFilterTypeEduProgram
            (@Param("clazzId") String clazzId, @Param("phaseId") Integer phaseId);

    @Query("SELECT o FROM OpenSessionRegistration o " +
            "JOIN FETCH o.session s " +
            "JOIN FETCH s.course c " + // fetch eage
            "JOIN FETCH s.schedules sc " + // fetch eage
            "JOIN o.registrationPhase p " +
            "WHERE p.registrationPhaseId = :phaseId " +
            "AND s.course.courseId IN " +
            "(SELECT ses.course.courseId FROM Session ses " +
            "JOIN ses.openSessionRegistration osr " +
            "JOIN osr.enrollments erm " +
            "WHERE erm.student.studentId = :studentId AND erm.status = 0 AND erm.isPassed = false)")
    List<OpenSessionRegistration> getAllByFilterTypeCourseNotPassed
            (@Param("studentId") String studentId, @Param("phaseId") Integer phaseId);


    // Lấy danh sách các lớp học phần được đăng ký bởi sinh viên trong giai đoạn hiện tại
    @Query("SELECT o, e.enrollTime FROM OpenSessionRegistration o " +
            "JOIN FETCH o.session s " + // fetch eager
            "JOIN FETCH s.course c " + // fetch eager
            "JOIN FETCH s.schedules sc " + // fetch eager
            "JOIN o.registrationPhase p " +
            "JOIN o.enrollments e " +
            "WHERE p.registrationPhaseId = :phaseId " +
            "AND e.student.studentId = :studentId " +
            "AND e.status = 0 ") // Đã đăng ký
    List<Object[]> getAllIsRegisteredByStudentId
            (@Param("phaseId") Integer phaseId, @Param("studentId") String studentId);


}
