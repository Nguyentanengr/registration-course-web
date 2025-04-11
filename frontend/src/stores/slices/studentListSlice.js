import { createSlice } from "@reduxjs/toolkit";
import { fetchComformOpenSection } from "../../apis/openSectionApi";
import { fetchStudentsByOpenSection } from "../../apis/studentApi";
import { fetchAllClassInfos } from "../../apis/classApi";

export const studentListSlice = createSlice({
    name: 'studentList',
    initialState: {
        // tìm kiếm
        filterClassId: null,
        filterYear: null,
        filterSemester: null,
        searchKey: '',
        stLoading: false,
        seLoading: false,
        classIds: [
            'D22CQCN02-N',
            'D23CQCN02-N',
            'D24CQCN02-N',
        ],
        openSections: [
            {
                openSectionId: 20001,
                sectionId: 10001,
                courseId: 'INT1339',
                courseName: 'Công nghệ phần mềm',
                classId: 'D22CQCQN02-N',
                groupNumber: 1,
                year: 2024,
                semester: 1,
                students: 67,
            },
            {
                openSectionId: 20002,
                sectionId: 10002,
                courseId: 'INT1339',
                courseName: 'Lập trình C++',
                classId: 'D22CQCQN02-N',
                groupNumber: 1,
                year: 2024,
                semester: 1,
                students: 73,
            }
        ],

        // check box
        checkedSectionIds: [],

        // student list
        students: [
            {
                studentId: 'N22DCCN156',
                fullname: 'Phạm Tấn Nguyên',
                dateOfBirth: '2003-09-12',
                gender: 'MALE',
                registerDate: '2004-08-24T20:01:54',
            },
            {
                studentId: 'N22DCCN163',
                fullname: 'Ngô Tấn Sang',
                dateOfBirth: '2004-09-13',
                gender: 'FEMALE',
                registerDate: '2024-08-24T20:01:54',
            }
        ],

    },
    reducers: {
        setSearchKey: (state, action) => {
            state.searchKey = action.payload;
        },
        setFilterClassId: (state, action) => {
            state.filterClassId = action.payload;
        },
        setFilterYear: (state, action) => {
            state.filterYear = action.payload;
        },
        setFilterSemester: (state, action) => {
            state.filterSemester = action.payload;
        },
        resetFilter: (state, action) => {
            state.filterClassId = null,
            state.filterSemester = null,
            state.filterYear = null
        },
        setOpenSections: (state, action) => {
            state.openSections = action.payload;
        },

        // check box
        addCheckedSectionId: (state, action) => {
            state.checkedSectionIds = [...state.checkedSectionIds, action.payload];
        },
        removeCheckedSectionId: (state, action) => {
            state.checkedSectionIds = state.checkedSectionIds.filter((id) => id != action.payload);
        },
        setCheckedSectionId: (state, action) => {
            state.checkedSectionIds = action.payload;
        }        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentsByOpenSection.pending, (state) => {
                state.stLoading = true;
            })
            .addCase(fetchStudentsByOpenSection.fulfilled, (state, { payload }) => {
                state.students = payload.data;
                state.stLoading = false;
            })
            .addCase(fetchComformOpenSection.pending, (state) => {
                state.seLoading = true;
            })
            .addCase(fetchComformOpenSection.fulfilled, (state, {payload }) => {
                state.seLoading = false;
                state.openSections = payload.data;
            })
            .addCase(fetchAllClassInfos.fulfilled, (state, {payload}) => {
                console.log(payload);
                state.classIds = payload;
            })
    }

});

export const {
    setSearchKey,
    setFilterClassId,
    setFilterSemester,
    setFilterYear,
    resetFilter,
    addCheckedSectionId,
    removeCheckedSectionId,
    setCheckedSectionId,
    setOpenSections,
} = studentListSlice.actions;
export default studentListSlice.reducer;