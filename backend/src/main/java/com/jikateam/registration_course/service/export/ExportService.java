package com.jikateam.registration_course.service.export;

import com.jikateam.registration_course.constant.Gender;
import com.jikateam.registration_course.dto.request.ExportStudentListOnSessionRequest;
import com.jikateam.registration_course.dto.response.ExportResponse;
import com.jikateam.registration_course.dto.response.ListStudentRegisterResponse;
import com.jikateam.registration_course.dto.response.StudentRegisterResponse;
import com.jikateam.registration_course.repository.StudentRepository;
import com.jikateam.registration_course.service.student.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExportService {

    private final StudentService studentService;

    public ExportResponse<Resource> exportStudentListOnSessions(ExportStudentListOnSessionRequest request) throws Exception {

        List<Integer> openSessionIds = request.openSessionIds();

        // Danh sách các lớp học phần, mỗi lớp có danh sách sinh viên
        log.info("{}", request);

        List<ListStudentRegisterResponse> studentsOnSessions
                = studentService.getAllStudentByOpenSessionIds(openSessionIds);

        if (studentsOnSessions.size() == 1) {

            // 1 lớp thì trả về file excel
            ListStudentRegisterResponse session = studentsOnSessions.get(0);
            Resource resource = exportSingleStudentList(session);
            String filename = String.format("%s_%s_%d.xlsx"
                    , session.courseId(), session.classId(), session.groupNumber());
            return new ExportResponse<>(filename, resource, resource.contentLength());
        } else {
            // Nhiều lớp thì tạo file zip
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            try (ZipOutputStream zipOut = new ZipOutputStream(baos)) {
                for (ListStudentRegisterResponse session : studentsOnSessions) {
                    Resource resource = exportSingleStudentList(session);
                    String fileName = String.format("%s_%s_%d.xlsx", session.courseId(), session.classId(), session.groupNumber());

                    // Thêm file excel vao zip
                    ZipEntry zipEntry = new ZipEntry(fileName);
                    zipOut.putNextEntry(zipEntry);
                    zipOut.write(((ByteArrayResource) resource).getByteArray());
                    zipOut.closeEntry();
                }
            }

            byte[] zipBytes = baos.toByteArray();
            ByteArrayResource resource = new ByteArrayResource(zipBytes);
            return new ExportResponse<>("dssv.zip", resource, (long) zipBytes.length);
        }
    }

    private Resource exportSingleStudentList(ListStudentRegisterResponse studentsOnSession) throws IOException {
        // Tạo file excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Danh sách sinh viên");

        // Tạo header
        Row headerRow = sheet.createRow(0);
        String[] headers = {"STT", "Mã SV", "Họ và tên", "Ngày sinh", "Giới tính", "Ngày đăng ký", "Điểm GK", "Điểm CK", "Tổng kết"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }

        // Điền dữ liệu sinh viên
        List<StudentRegisterResponse> students = studentsOnSession.students();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        for (int i = 0; i < students.size(); i++) {
            StudentRegisterResponse student = students.get(i);
            Row row = sheet.createRow(i + 1);

            row.createCell(0).setCellValue(i + 1); // STT
            row.createCell(1).setCellValue(student.studentId()); // Mã SV
            row.createCell(2).setCellValue(student.fullname()); // Họ và tên
            row.createCell(3).setCellValue(student.dateOfBirth().format(dateFormatter)); // Ngày sinh
            row.createCell(4).setCellValue(student.gender().equals(Gender.MALE) ? "Nam" : "Nữ"); // Giới tính
            row.createCell(5).setCellValue(student.registerDate().format(dateTimeFormatter)); // Ngày đăng ký
            row.createCell(6).setCellValue("-"); // Điểm GK
            row.createCell(7).setCellValue("-"); // Điểm CK
            row.createCell(8).setCellValue("-"); // Tổng kết
        }

        // Tự động điều chỉnh kích thước cột
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Chuyển workbook thành byte array
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        byte[] bytes = outputStream.toByteArray();

        return new ByteArrayResource(bytes);
    }

}
