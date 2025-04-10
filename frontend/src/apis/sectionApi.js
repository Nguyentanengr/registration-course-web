import { createAsyncThunk } from "@reduxjs/toolkit";

const GET_SECTION_API = "http://localhost:8080/api/v1/sessions?";
const DELETE_SECTION_API = "http://localhost:8080/api/v1/sessions/";
const POST_SECTION_API = "http://localhost:8080/api/v1/sessions";
const getStatusSection = (string) => {
    switch (string) {
        case 'Tất cả học phần':
            return '';
        case 'Đang hoạt động':
            return '&status=4';
        case 'Đang mở':
            return '&status=0';
        case 'Sắp tới':
            return '&status=7';
        default:
            return '';
    }
}

function convertSectionToJson(section) {
    // Map the section object to the required JSON format
    const json = {
        courseId: section.courseId,
        clazzId: section.classId, // Rename classId to clazzId
        year: section.year,
        semester: section.semester,
        groupNumber: section.groupNumber,
        minStudents: section.minStudents,
        maxStudents: section.maxStudents,
        scheduleRequests: section.schedules.map(schedule => ({
            teacherId: schedule.teacherId,
            placeId: schedule.placeId,
            dayOfWeek: schedule.dayOfWeek,
            startPeriod: schedule.startPeriod,
            endPeriod: schedule.endPeriod,
            startDate: schedule.startDate,
            endDate: schedule.endDate
        }))
    };

    return json;
}

export const fetchSections = createAsyncThunk('sections/filter',
    async ({ filter, searchKey, currentPage, itemPerPage }, { rejectWithValue }) => {
        console.log(filter, searchKey, currentPage, itemPerPage);
        
        try {
            const TARGET_API = GET_SECTION_API + "searchKey=" + searchKey + "&page=" + (currentPage - 1) + "&size=" + itemPerPage + getStatusSection(filter);
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
            console.log(objectResponse);
            if (objectResponse.code != 1000) {
                return rejectWithValue({
                    code: objectResponse.code,
                    message: objectResponse.message || "Lỗi khi lấy dữ liệu"
                });
            };
            return objectResponse;

        } catch (error) {
            // lỗi mạng hoặc lỗi sự cố khi truyền mạng
            return rejectWithValue({
                code: 9900,
                message: error.message || "Lỗi kết nối tới server"
            });
        }
    });

export const deleteSection = createAsyncThunk('sections/delete'
    , async ({ sessionId }, { rejectWithValue }) => {
        
        try {
            const TARGET_API = DELETE_SECTION_API + sessionId;
            console.log(TARGET_API);
            
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(TARGET_API, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorized": "Bearer" + TOKEN,
                }
            });

            const objectResponse = await response.json();
            if (objectResponse.code != 1000) {
                return rejectWithValue({
                    code: objectResponse.code,
                    message: objectResponse.message
                });
            }
            return objectResponse;
        } catch (error) {
            console.log("reject");
            
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
});



export const createSection = createAsyncThunk('sections/createSection'
    , async ({ section }, { rejectWithValue }) => {
        
        try {
            const json = convertSectionToJson(section);
            console.log(json);
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(POST_SECTION_API, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorized": "Bearer" + TOKEN,
                },
                body: JSON.stringify(json),
            });

            const objectResponse = await response.json();
            if (objectResponse.code != 1000) {
                return rejectWithValue({
                    code: objectResponse.code,
                    message: objectResponse.message
                });
            }
            return objectResponse;
        } catch (error) {
            console.log("reject");
            
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
});