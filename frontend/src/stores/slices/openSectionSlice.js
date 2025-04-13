import { createSlice } from "@reduxjs/toolkit";
import { fetchActiveClassInfos } from "../../apis/classApi";
import { fetchAllPhaseBySemester } from "../../apis/phaseApi";
import { fetchSectionsBySemester } from "../../apis/sectionApi";
import { createOpenSections, fetchOpenedSection } from "../../apis/openSectionApi";
import { SiTicketmaster } from "react-icons/si";


const openSectionSlice = createSlice({
    name: 'openSection',
    initialState: {

        // search section to choose
        years: [],
        semesters: [],
        classId: '',
        phaseId: null,
        year: null,
        semester: null,
        classes: [],
        openPhases: [
        ],
        sections: [],

        // Chọn & mở học phần
        openSections: [],
        postLoading: false,
        postError: null,

        // Lấy danh sách học phần đã mở
        searchSection: '',
        oLoading: false,
        openedSections: [],
    },
    reducers: {
        
        setSearchSection: (state, action) => {
            state.searchSection = action.payload;
        },
        setYears: (state, action) => {
            state.years = action.payload;
        },
        setSemesters: (state, action) => {
            state.semesters = action.payload;
        },
        setClassId: (state, action) => {
            state.classId = action.payload;
        },
        setYear: (state, action) => {
            state.year = action.payload;
        },
        setSemester: (state, action) => {
            state.semester = action.payload;
        },
        setPhaseId: (state, action) => {
            state.phaseId = action.payload;
        },
        resetSections: (state) => {
            state.sections = [];
        },
        addOpenSection: (state, action) => {
            state.openSections = [...state.openSections, action.payload];
        },
        removeOpenSection: (state, action) => {
            state.openSections = state.openSections.filter((o) => o.sectionId !== action.payload);
        },
        setOpenSection: (state, action) => {
            state.openSections = action.payload;
        },
        resetOpenSection: (state) => {
            state.openSections = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActiveClassInfos.fulfilled, (state, { payload }) => {
                state.classes = payload.data;
            })
            .addCase(fetchAllPhaseBySemester.fulfilled, (state, { payload }) => {
                state.openPhases = payload.data;
            })
            .addCase(fetchSectionsBySemester.fulfilled, (state, { payload }) => {
                console.log("Result for sections");
                console.log(payload);
                state.sections = payload.data;
            })
            .addCase(createOpenSections.pending, (state) => {
                state.postLoading = true;
                state.postError = null;
            })
            .addCase(createOpenSections.fulfilled, (state) => {
                state.postLoading = false;
                state.postError = null;
            })
            .addCase(createOpenSections.rejected, (state, { payload }) => {
                state.postLoading = false;
                state.postError = payload;
            })
            .addCase(fetchOpenedSection.pending, (state) => {
                state.oLoading = true;
                state.getError = null;
            })
            .addCase(fetchOpenedSection.fulfilled, (state, { payload }) => {
                state.oLoading = false;
                state.openedSections = payload.data;
            })
            .addCase(fetchOpenedSection.rejected, (state, { payload }) => {
                state.oLoading = false;
            })
    }

});

export const { setYears, setSemesters, setPhaseId, resetSections
    , setSemester, setClassId, setYear, resetOpenSection
    , addOpenSection, removeOpenSection, setOpenSection
    , setSearchSection } = openSectionSlice.actions;
export default openSectionSlice.reducer;