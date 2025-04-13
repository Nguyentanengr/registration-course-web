import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_ENROLL_API = `${import.meta.env.VITE_API_URL}/api/v1/open-sessions/register`;
export const postRegister = createAsyncThunk('openSessions/register',
    async ( {studentId, openSessionId, status }, { rejectWithValue }) => {
        try {

            const TOKEN = localStorage.getItem('token');
            console.log(POST_ENROLL_API);
            const response = await fetch(POST_ENROLL_API, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorized": "Bearer " + TOKEN,
                },
                body: JSON.stringify({studentId, openSessionId, status}),
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