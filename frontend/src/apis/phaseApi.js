import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_PHASE_API = 'http://localhost:8080/api/v1/phases';
export const POST_PHASE_API = 'http://localhost:8080/api/v1/phases';

const normalizeObject = (phase) => {
    const target = {
        registrationPhaseName: phase.name,
        semester: phase.semester,
        year: phase.year,
        openTime: phase.openTime,
        closeTime: phase.closeTime,
    }
    console.log(target);
    return target;
};

export const fetchAllPhase = createAsyncThunk('phases/getAllPhases',
    async ({ searchKey }, { rejectWithValue }) => {
        try {
            const TOKEN = localStorage.getItem('token');
            const TARGET_API = GET_PHASE_API + `?searchKey=${searchKey}`;
            console.log(TARGET_API);
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

export const createPhase = createAsyncThunk('phases/postPhase', 
    async ({ phase }, { rejectWithValue }) => {
        try {
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(POST_PHASE_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorized': 'Bearer ' + TOKEN,
                },
                body: JSON.stringify(normalizeObject(phase)),
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
)