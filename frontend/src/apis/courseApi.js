import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_COURSE_BY_SEMESTER_API = 'http://localhost:8080/api/v1/courses';



export const fetchCourseBySemester = createAsyncThunk('courses/fetchBySemester',
    async ({ classId, year, semester }, { rejectWithValue }) => {
        try {
            const TARGET_API = GET_COURSE_BY_SEMESTER_API + `?classId=${classId}&year=${year}&semester=${semester}`;
            console.log(TARGET_API);
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(TARGET_API, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorized": "Bearer " + TOKEN,
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
        } catch (error) {
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
    });