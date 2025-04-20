import { createAsyncThunk } from "@reduxjs/toolkit";


export const POST_EXPORT_STUDENT_API = `${import.meta.env.VITE_API_URL}/api/v1/export/students-on-session`;

export const exportStudentsByOpenSections = createAsyncThunk('students/exportStudents',
    async ({ openSessionIds }, { rejectWithValue }) => {
        try {

            console.log(POST_EXPORT_STUDENT_API);
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(POST_EXPORT_STUDENT_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorized': 'Bearer ' + TOKEN,
                },
                body: JSON.stringify({ openSessionIds: openSessionIds })
            });

            // Kiểm tra nếu phản hồi không thành công
            if (!response.ok) {
                const errorResponse = await response.json(); // API trả về JSON khi có lỗi
                return rejectWithValue({
                    code: errorResponse.code || 9090,
                    message: errorResponse.message || "Đã có lỗi xảy ra",
                });
            }

            // Lấy dữ liệu binary dưới dạng Blob
            const blob = await response.blob();

            // Lấy tên file từ header Content-Disposition
            const contentDisposition = response.headers.get("content-disposition");
            console.log("contentDisposition");
            console.log(contentDisposition);
            let fileName = openSessionIds.length === 1 ? "default.xlsx" : "dssv.zip";
            if (contentDisposition) {
                const [text, file] = contentDisposition.split('=');
                fileName = file;
            }

            // Tự động tải file ngay trong thunk
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Trả về dữ liệu serializable cho Redux
            return { fileName, success: true };
        } catch (error) {
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
    }
);
