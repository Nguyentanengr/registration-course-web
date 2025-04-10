import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_OPEN_SECTION_API = 'http://localhost:8080/api/v1/open-sessions/batch';

const normalizeObject = (openSections) => {

    const openSessions = openSections.map((o) => {
        return {
            sessionId: o.sectionId,
            registrationPhaseId: o.phaseId,
            managerId: o.managerId,
        }
    });

    const target = {openSessions};
    console.log(JSON.stringify(target));
    return target;
};


export const createOpenSections = createAsyncThunk('openSections/postBatch', 
    async ({ openSections }, { rejectWithValue }) => {
        try {
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(POST_OPEN_SECTION_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorized': 'Bearer ' + TOKEN,
                },
                body: JSON.stringify(normalizeObject(openSections)),
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
