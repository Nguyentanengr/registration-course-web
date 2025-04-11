import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_OPEN_SECTION_API = 'http://localhost:8080/api/v1/open-sessions/batch';
export const GET_OPENED_SECTION_API = 'http://localhost:8080/api/v1/open-sessions';
export const REVERT_OPEN_SECTION_API = 'http://localhost:8080/api/v1/open-sessions/revert';
export const CONFIRM_OPEN_SECTION_API = 'http://localhost:8080/api/v1/open-sessions';

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

const parseOpenedSection = (data) => {
    const targets = data.map((d) => {
        let openedSection = {
            openedSectionId: d.openSessionRegistrationId,
            sectionId: d.session.sessionId,
            courseId: d.session.courseInfo.courseId,
            courseName: d.session.courseInfo.courseName,
            classId: d.session.clazzId,
            groupNumber: d.session.groupNumber,
            year: d.session.year,
            semester: d.session.semester,
            registers: d.numberOfRegister,
            maxStudents: d.session.maxStudents,
            minStudents:  d.session.minStudents,
            phaseId: d.registrationPhase.phaseId,
            phaseName: d.registrationPhase.phaseName,
            status: d.status,
        }
        console.log(openedSection);
        return openedSection;
    });
    return targets;
}


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



export const fetchOpenedSection = createAsyncThunk('openSections/getOpened', 
    async ({ searchKey }, { rejectWithValue }) => {
        try {

            const TARGET_API = `http://localhost:8080/api/v1/open-sessions?searchKey=${searchKey}`;
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
            // Chuẩn hóa data api theo giao diện
            objectResponse.data = parseOpenedSection(objectResponse.data);
            return objectResponse;
        } catch(error) {
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
    }
);


export const revertOpenSections = createAsyncThunk('openSections/revert', 
    async ({ openSectionId }, { rejectWithValue }) => {
        try {
            const TARGET_API = `http://localhost:8080/api/v1/open-sessions/revert/${openSectionId}`
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(TARGET_API, {
                method: 'DELETE',
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

// confirmOpenSections

export const confirmOpenSections = createAsyncThunk('openSections/confirm', 
    async ({ openSectionId, status }, { rejectWithValue }) => {
        try {
            const TARGET_API = `http://localhost:8080/api/v1/open-sessions/${openSectionId}`
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(TARGET_API, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorized': 'Bearer ' + TOKEN,
                },
                body: JSON.stringify({ status: status })
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

