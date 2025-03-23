package com.jikateam.registration_course;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RegistrationCourseApplication {

	public static void main(String[] args) {

		// Tải tệp .env từ thư mục gốc
		Dotenv dotenv = Dotenv.configure().load();
		// Đưa các biến từ .env vào môi trường hệ thống
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(RegistrationCourseApplication.class, args);
	}
}

