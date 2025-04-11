import { createSlice } from "@reduxjs/toolkit";

export const studentListSlice = createSlice({
    name: 'studentList',
    initialState: {
        // tìm kiếm
        filterClassId: null,
        filterYear: null,
        filterSemester: null,
        searchKey: '',
        classIds: [
            'D22CQCN02-N',
            'D23CQCN02-N',
            'D24CQCN02-N',
        ],
        sections: [
            {
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
                dayOfBirth: '04/05/2003',
                gender: 'male',
                registerDate: '24-08-2024T20:01:54',
            },
            {
                studentId: 'N22DCCN163',
                fullname: 'Ngô Tấn Sang',
                dayOfBirth: '04/05/2004',
                gender: 'male',
                registerDate: '24-08-2024T20:01:54',
            }
        ]

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
} = studentListSlice.actions;
export default studentListSlice.reducer;