import { createAsyncThunk } from "@reduxjs/toolkit";


const GET_SCHEDULE_ON_SECTION_API = `${import.meta.env.VITE_API_URL}/api/v1/schedules/on-session?sessionId=`;
const PUT_SCHEDULE_ON_SECTION_API = `${import.meta.env.VITE_API_URL}/api/v1/sessions/*/schedules`;

export const fetchScheduleOnSection = createAsyncThunk('schedules/getScheduleOnSection'
    , async ({ sessionId }, { rejectWithValue }) => {

        try {
            const TARGET_API = GET_SCHEDULE_ON_SECTION_API + sessionId;
            console.log(TARGET_API);

            const TOKEN = localStorage.getItem('token');
            const response = await fetch(TARGET_API, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorized": "Bearer" + TOKEN,
                }
            });

            const objectResponse = await response.json();

            if (objectResponse.code != 1000) {
                return rejectWithValue({
                    code: objectResponse.code,
                    message: objectResponse.message || "Lỗi khi lấy dữ liệu"
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


export const updateScheduleOnSection = createAsyncThunk('schedules/updateScheduleOnSection'
    , async ({ sessionId, schedules }, { rejectWithValue }) => {

        try {
            const TARGET_API = PUT_SCHEDULE_ON_SECTION_API.replace('*', sessionId);
            console.log(TARGET_API);

            const TOKEN = localStorage.getItem('token');
            const response = await fetch(TARGET_API, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorized": "Bearer" + TOKEN,
                },
                body: JSON.stringify({schedules: schedules}),
            });

            const objectResponse = await response.json();

            if (objectResponse.code != 1000) {
                return rejectWithValue({
                    code: objectResponse.code,
                    message: objectResponse.message || "Lỗi khi lấy dữ liệu"
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