import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_TIME_TABLE_API = `${import.meta.env.VITE_API_URL}/api/v1/schedules`;

export const fetchTimeTable = createAsyncThunk('schedules/getTimeTable',
    async ({ studentId, semester, year }, { rejectWithValue }) => {
        try {
            const TARGET_API = GET_TIME_TABLE_API + `?studentId=${studentId}&semester=${semester}&year=${year}`
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