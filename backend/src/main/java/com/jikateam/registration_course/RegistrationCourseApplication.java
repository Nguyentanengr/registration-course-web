package com.jikateam.registration_course;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RegistrationCourseApplication {

	public static void main(String[] args) {

		SpringApplication.run(RegistrationCourseApplication.class, args);
	}
}

