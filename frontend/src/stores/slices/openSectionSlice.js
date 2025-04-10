import { createSlice } from "@reduxjs/toolkit";


const openSectionSlice = createSlice({
    name: 'openSection',
    initialState: {

        // search section to choose
        classes: [],
        years: [],
        semesters: [],
        phases: [],
        sections: [
            {
                sessionId: 10020,
                courseInfo: {
                    courseId: "INT4105",
                    courseName: "IOT và ứng dụng",
                    credits: 3
                },
                clazzId: "D22CQCN02-N",
                year: 2025,
                semester: 1,
                groupNumber: 1,
                minStudents: 20,
                maxStudents: 100,
                startDate: "2025-08-11",
                endDate: "2025-10-21",
                status: null,
                scheduleIds: null
            }
        ],
    },
    reducers: {
        setClasses: (state, action) => {
            state.classes = [...state.classes, action.payload];
        },
        setYears: (state, action) => {
            state.years = [...state.years, action.payload];
        },
        setSemester: (state, action) => {
            state.semesters = [...state.semesters, action.payload];
        },
        setSemester: (state, action) => {
            state.phases = [...state.phases, action.payload];
        },


    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchAllPhase.pending, (state) => {
    //             state.getLoading = true;
    //         })
    // }

});

export const { } = openSectionSlice.actions;
export default openSectionSlice.reducer;