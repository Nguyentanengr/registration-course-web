import { createSlice } from "@reduxjs/toolkit";
import { fetchSections } from "../../apis/sectionApi";



const sectionSlice = createSlice({
    name: "section",
    initialState: {
        loading: false,
        error: null,
        filter: 'Tất cả học phần',
        filters: ['Tất cả học phần', 'Đang hoạt động', 'Đang mở', 'Sắp tới'],
        sections: [
            // {
            //     id: '10001',
            //     courseId: 'INT1339',
            //     nameCourse: 'Thực tập cơ sở',
            //     class: 'D22CQCN02-N',
            //     group: '01',
            //     credits: 3,
            //     year: 2025,
            //     semester: 1,
            //     quantity: '20-100',
            //     lessons: '2 Buổi',
            //     status: 'Đang mở',
            // },
            // {
            //     id: '10002',
            //     courseId: 'INT1229',
            //     nameCourse: 'Nhập môn trí tuệ nhân tạo',
            //     class: 'D22CQCN02-N',
            //     group: '01',
            //     credits: 3,
            //     year: 2025,
            //     semester: 1,
            //     quantity: '20-100',
            //     lessons: '2 Buổi',
            //     status: 'Chưa mở',
            // },
            // {
            //     id: '10003',
            //     courseId: 'INT1367',
            //     nameCourse: 'An toàn bảo mật hệ thống thông tin',
            //     class: 'D22CQCN02-N',
            //     group: '01',
            //     credits: 3,
            //     year: 2025,
            //     semester: 1,
            //     quantity: '20-100',
            //     lessons: '2 Buổi',
            //     status: 'Đang dạy',
            // },
            // {
            //     id: '10004',
            //     courseId: 'INT2139',
            //     nameCourse: 'Lập trình web',
            //     class: 'D22CQCN02-N',
            //     group: '01',
            //     credits: 3,
            //     year: 2025,
            //     semester: 1,
            //     quantity: '20-100',
            //     lessons: '2 Buổi',
            //     status: 'Đang mở',
            // },
            // {
            //     id: '10005',
            //     courseId: 'INT1309',
            //     nameCourse: 'Cơ sở dữ liệu',
            //     class: 'D22CQCN02-N',
            //     group: '01',
            //     credits: 3,
            //     year: 2025,
            //     semester: 1,
            //     quantity: '20-100',
            //     lessons: '2 Buổi',
            //     status: 'Đang dạy',
            // },
        ],
        currentPage: 1,
        totalPage: 1,
        itemPerPage: 10,
        itemPerPages: [10, 20, 50],
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
            console.log("toi dang o day");
            
            state.currentPage = action.payload;
        },
        setItemPerPage: (state, action) => {
            state.itemPerPage = action.payload;
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSections.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.error = null;                
                state.totalPage = payload.data.totalPages;
                state.sections = payload.data.sessions;
            })
            .addCase(fetchSections.rejected, (state, {payload}) => {
                state.loading = false;
                state.error = payload;
            })
    }
});

export const { setFilter, setCurrentPage, setSearchKey, setClassId, setYear, setSemester,
    setCourseId, setGroup, setMinStudents, setMaxStudents, addSchedule, removeSchedule, setItemPerPage } = sectionSlice.actions;
export default sectionSlice.reducer;