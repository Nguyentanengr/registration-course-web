import { createSlice } from "@reduxjs/toolkit";
import { createSection, deleteSection, fetchSections } from "../../apis/sectionApi";
import { fetchActiveClassIds } from "../../apis/classApi";
import { fetchCourseBySemester } from "../../apis/courseApi";
import { fetchAllPlaces } from "../../apis/placeApi";
import { fetchTeacherForCourse } from "../../apis/teacherApi";



const sectionSlice = createSlice({
    name: "section",
    initialState: {
        counter: 1,
        loading: false,
        error: null,
        filter: 'Tất cả học phần',
        filters: ['Tất cả học phần', 'Đang hoạt động', 'Đang mở', 'Sắp tới', 'Đã hủy'],
        sections: [],
        currentPage: 1,
        totalPage: 1,
        itemPerPage: 10,
        itemPerPages: [10, 20, 50],
        searchKey: '',

        // add
        classIds: [],
        years: [],
        semesters: [1, 2, 3],
        courses: [],
        dayOfWeeks: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
        periods: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        teachers: [],
        places: [],

        addSectionForm: {
            classId: '',
            year: null,
            semester: 1,
            courseId: '',
            groupNumber: 1,
            minStudents: 20,
            maxStudents: 100,
            schedules: [],
        },

        // delete
        deleteLoading: false,
        deleteError: null,

        // post
        postLoading: false,
        postError: null,

    },
    reducers: {
        setYears: (state, action) => {
            state.years = action.payload;
        },
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
        setItemPerPage: (state, action) => {
            state.itemPerPage = action.payload;
        },
        setClassId: (state, action) => {
            state.addSectionForm.classId = action.payload;
        },
        setYear: (state, action) => {
            console.log(action.payload);
            state.addSectionForm.year = action.payload;
        },
        setSemester: (state, action) => {
            state.addSectionForm.semester = action.payload;
        },
        setCourseId: (state, action) => {
            state.addSectionForm.courseId = action.payload;
        },
        setGroup: (state, action) => {
            state.addSectionForm.groupNumber = action.payload;
        },
        setMinStudents: (state, action) => {
            state.addSectionForm.minStudents = action.payload;
        },
        setMaxStudents: (state, action) => {
            state.addSectionForm.maxStudents = action.payload;
        },
        setSchedules: (state, action) => {
            state.addSectionForm.schedules = action.payload;
        },
        resetTeacherAndPlace: (state) => {
            state.teachers = [];
            state.places = [];
        },
        addSchedule: (state, action) => {
            let schedule = { ...action.payload, "scheduleId": state.counter };
            state.addSectionForm.schedules = [...state.addSectionForm.schedules, schedule];
            state.counter += 1;
        },
        removeSchedule: (state, action) => { // action only contain id:string
            state.addSectionForm.schedules = state.addSectionForm.schedules
                .filter((s) => (s.scheduleId !== action.payload));
        },
        resetSectionForm: (state) => {
            state.addSectionForm = {
                classId: '',
                year: null,
                semester: 1,
                courseId: '',
                groupNumber: 1,
                minStudents: 20,
                maxStudents: 100,
                schedules: [],
            }
        },
        resetAddSectionState: (state) => {
            state.classIds= [];
            state.years= [];
            state.semesters= [1, 2, 3];
            state.courses= [];
            state.dayOfWeeks= ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
            state.periods= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            state.teachers= [];
            state.places= [];
        },

        removeSection: (state, action) => {
            state.sections = state.sections.filter((s) => !(s.sessionId == action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSections.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.totalPage = payload.data.totalPages;
                state.sections = payload.data.sessions;
            })
            .addCase(fetchSections.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(deleteSection.pending, (state) => {
                state.deleteLoading = true;
                state.deleteError = null;
            })
            .addCase(deleteSection.fulfilled, (state) => {
                state.deleteLoading = false;
                state.deleteError = null;
            })
            .addCase(deleteSection.rejected, (state, { payload }) => {
                console.log(payload);
                state.deleteLoading = false;
                state.deleteError = payload;
            })
            .addCase(fetchActiveClassIds.fulfilled, (state, { payload }) => {
                state.classIds = payload.data;
            })
            .addCase(fetchCourseBySemester.fulfilled, (state, { payload }) => {
                state.courses = payload.data;
            } )
            .addCase(fetchTeacherForCourse.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.teachers = payload.data;
            })
            .addCase(fetchAllPlaces.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.places = payload.data;
            })
            .addCase(createSection.pending, (state) => {
                state.postLoading = true;
                state.postError = null;
            })
            .addCase(createSection.fulfilled, (state) => {
                console.log("create success");
                state.postLoading = false;
                state.postError = null;
            })
            .addCase(createSection.rejected, (state, { payload }) => {
                console.log("create fail");
                state.postLoading = false;
                state.postError = payload;
            })
    }
});

export const { setFilter, setCurrentPage, setSearchKey, setClassId, setYear, setSemester,
    setCourseId, setGroup, setMinStudents, setMaxStudents, addSchedule, removeSchedule, setItemPerPage, removeSection, resetScheduleState, setYears, setSchedules, resetSectionForm, resetAddSectionState, resetTeacherAndPlace } = sectionSlice.actions;
export default sectionSlice.reducer;