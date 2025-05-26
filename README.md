# SBox - Course Registration System 📚

![](about.docs\images\portal-login.png)

## Overview
SBox is a web application designed for **Học Viện Công Nghệ Bưu Chính Viễn Thông** to streamline course registration for students and course management for administrators. It provides a user-friendly interface for students to register for courses and view schedules, while allowing administrators to manage courses, registration periods, and student enrollments efficiently.

## Features

### For Administrators 🛠️
- **Manage Courses**: Create, view, update, and delete course sections.
- **Manage Registration Periods**: Create registration periods and assign course sections to them.
- **Monitor Enrollments**: Track the number of registered students and approve course sections.
- **Export Data**: View the list of registered students and export data as Excel or ZIP files.

### For Students 🎓
- **View Available Courses**: Browse open course sections based on the student's current class.
- **Register for Courses**: Enroll in courses and track registration status.
- **View Schedules**: Access detailed timetables for registered courses.

## Technologies Used 🛠️
- **Backend**:
  - Java 17
  - Spring Boot 3.4
  - Spring Data JPA
  - Spring Security with OAuth2 JWT
  - MapStruct
  - Lombok
  - Mailjet (for email services)
- **Frontend**:
  - JavaScript
  - React.js
  - HTML & CSS
- **Database**: MySQL (hosted on Azure)
- **Cache**: Redis (optional)
- **Build Tool**: Maven

## Prerequisites
- Java 17 or higher
- Node.js 18.x or higher
- Maven 3.8.x or higher
- MySQL database (Azure or local)
- Mailjet API key (for email functionality)
- JWT secret key (for authentication)
- Redis (optional, for caching)
- IDE (e.g., IntelliJ IDEA) or terminal for running commands

## Installation 🚀

### 1. Clone the Repository
```bash
git clone https://github.com/Nguyentanengr/registration-course-web.git
cd registration-course-web
```

### 2. Configure Environment Variables
- Create a `.env` file in the `/backend/src/main/resources/` directory based on the `application.properties` template.
- Example `.env`:
```plaintext
DBMS_URL=jdbc:mysql://<your-hostname>:3306/<your-database>
DBMS_USERNAME=xxxxxxxxxxxx
DBMS_PASSWORD=xxxxxxxxxxxxx
JWT_SEC_KEY=tozUzuCtjmD1+2sEFUxUuVkBf...
MAIL_KEY=5213f23ac46793d728388cfd9649...
MAIL_SECRET=a0911c2e19ecec8b6d2d65452...
REDIS_KEY=XtVPfnvs3tnlISqzLHty94nKqdU...
```

### 3. Run the Frontend
- Navigate to the frontend directory:
  ```bash
  cd frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
- The frontend will run at `http://localhost:5173`.
  - **Student Portal**: Automatically redirects to `http://localhost:5173/portal`
  - **Admin Portal**: Access at `http://localhost:5173/admin`

### 4. Run the Backend using IntelliJ IDEA
- Ensure the `dotenv` library is configured in your IDE.
- Open `RegistrationCourseApplication.java` in `/backend/src/main/java/com/jikateam/registration_course/`.
- Run the application directly from IntelliJ. The `.env` file will be automatically loaded.

### 5. Verify Installation
- Access the application:
  - **Student Portal**: `http://localhost:5173/portal`
  - **Admin Portal**: `http://localhost:5173/admin`
- If you encounter issues, check:
  - CORS configuration in the backend (`/backend/src/main/java/com/jikateam/registration_course/config/SecurityConfig.java`).
  - Base API URL in the frontend (`/frontend/.env` or similar).

## Contact 📧
For questions or feedback, contact [your-email@example.com](mailto:nguyen.tan.engr@gmail.com) or open an issue on GitHub.

## Preview 📸

### Register course section page
![](about.docs\images\portal-register.png)




### Timetable page
![](about.docs\images\portal-schedule.png)



### Course section page
![](about.docs\images\admin-section.png)

![](about.docs\images\admin-create-section.png)

### Open course section page
![](about.docs\images\admin-create-phase.png)
![](about.docs\images\admin-open-section.png)

### List opened course page
![](about.docs\images\admin-students.png)
![](about.docs\images\admin-list-student.png)


#### For more detail: read the report at about.docs/report/.docs