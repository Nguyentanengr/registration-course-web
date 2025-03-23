package com.jikateam.registration_course.service.course;

import com.jikateam.registration_course.converter.CourseConverter;
import com.jikateam.registration_course.dto.response.CourseInfoResponse;
import com.jikateam.registration_course.entity.Course;
import com.jikateam.registration_course.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseConverter courseConverter;

    public List<CourseInfoResponse> getAllCourseByFilter
            (String searchKey, String classId, Integer year, Integer semester) {

        List<Course> courses = null;

        if (classId == null && year == null && semester == null) { // search by courseId or courseName
            courses = courseRepository.getAllBySearchKey(searchKey);
        } else {
            courses = courseRepository.getAllByFilter(searchKey, classId, year, semester);
        }

        return courses.stream().map(courseConverter::mapToCourseInfoResponse).toList();
    }
}
