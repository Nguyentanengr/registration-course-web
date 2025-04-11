import { createAsyncThunk } from "@reduxjs/toolkit";


export const GET_STUDENTS_BY_OPEN_SECTION = 'http://localhost:8080/api/v1/students/by-session';


// http://localhost:8080/api/v1/students/by-session/10006


export const fetchStudentsByOpenSection = createAsyncThunk('students/byOpenSection', 
    async ({ openSectionId }, { rejectWithValue }) => {
        try {

            const TARGET_API = GET_STUDENTS_BY_OPEN_SECTION + `/${openSectionId}`;
            console.log(TARGET_API);
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(TARGET_API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorized': 'Bearer ' + TOKEN,
                },
            });

            const objectResponse = await response.json();
            if (objectResponse.code != 1000) {
                return rejectWithValue({
                    code: objectResponse.code,
                    message: objectResponse.message,
                });
            }
            return objectResponse;
        } catch(error) {
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
    }
);