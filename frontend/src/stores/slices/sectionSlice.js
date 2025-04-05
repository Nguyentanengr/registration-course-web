import { createSlice } from "@reduxjs/toolkit";



const sectionSlice = createSlice({
    name: "section",
    initialState: {
        filter: 'Tất cả học phần',
        filters: ['Tất cả học phần', 'Đang hoạt động', 'Đang mở', 'Sắp tới'],
        sections: [
            { id: '10001', nameCourse: 'Thực tập cơ sở', class: 'D22CQCN02-N', group: '01', credits: 3, year: 2025, semester: 1, score: '20-100', lessons: '2 Buổi', status: 'Đang mở' },
            { id: '10002', nameCourse: 'Nhập môn trí tuệ nhân tạo', class: 'D22CQCN02-N', group: '01', credits: 3, year: 2025, semester: 1, score: '20-100', lessons: '2 Buổi', status: 'Đã đóng' },
            { id: '10003', nameCourse: 'An toàn bảo mật hệ thống thông tin', class: 'D22CQCN02-N', group: '01', credits: 3, year: 2025, semester: 1, score: '20-100', lessons: '2 Buổi', status: 'Đang dạy' },
        ],
        currentPage: 1,
        totalPage: 1,
        searchKey: '',
        addSectionForm: {
            classId: '',
            year: 2025,
            semester: 1,
            courseId: '',
            group: 1,
            minStudents: 20,
            maxStudents: 100,
            schedules: []
        }
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.currentPage = 1;
        },
        setSearchKey: (state, action) => {
            state.searchKey = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setClassId: (state, action) => {
            state.addSectionForm.classId = action.payload;
        },
        setYear: (state, action) => {
            state.addSectionForm.year = action.payload;
        },
        setSemester: (state, action) => {
            state.addSectionForm.semester = action.payload;
        },
        setCourseId: (state, action) => {
            state.addSectionForm.courseId = action.payload;
        },
        setGroup: (state, action) => {
            state.addSectionForm.group = action.payload;
        },
        setMinStudents: (state, action) => {
            state.addSectionForm.minStudents = action.payload;
        },
        setMaxStudents: (state, action) => {
            state.addSectionForm.maxStudents = action.payload;
        },
        addSchedule: (state, action) => {
            let schedule = { ...action.payload, "scheduleId": state.addSectionForm.schedules.length + 1 };
            state.addSectionForm.schedules = [...state.addSectionForm.schedules, schedule];
        },
        removeSchedule: (state, action) => { // action only contain id:string
            state.addSectionForm.schedules = state.addSectionForm.schedules
                .filter((s) => !(s.scheduleId === action.payload));
        },


    }
});

export const { setFilter, setCurrentPage, setSearchKey, setClassId, setYear, setSemester,
    setCourseId, setGroup, setMinStudents, setMaxStudents, addSchedule, removeSchedule } = sectionSlice.actions;
export default sectionSlice.reducer;