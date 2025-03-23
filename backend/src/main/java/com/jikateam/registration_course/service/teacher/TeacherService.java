package com.jikateam.registration_course.service.teacher;

import com.jikateam.registration_course.constant.TeacherStatus;
import com.jikateam.registration_course.converter.TeacherConverter;
import com.jikateam.registration_course.dto.response.TeacherInfoResponse;
import com.jikateam.registration_course.entity.Teacher;
import com.jikateam.registration_course.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final TeacherConverter teacherConverter;

    public List<TeacherInfoResponse> getAllTeachers
            (String searchKey, String courseId, TeacherStatus status) {

        List<Teacher> teacherInfoResponses = teacherRepository
                .findTeacherByFilter(searchKey, courseId, status);

        return teacherInfoResponses.stream()
                .map(teacherConverter::mapToTeacherInfoResponse)
                .toList();
    }
}
