import { createSlice } from "@reduxjs/toolkit";
import { updateSectionInfo } from "../../apis/sectionApi";

export const editSectionSlice = createSlice({
    name: "editSection",
    initialState: {
        postLoading: false,
        postError: null,
        editSectionForm: {
            groupNumber: 1,
            minStudents: 20,
            maxStudents: 100,
        },
    },
    reducers: {
        setEditSectionForm: (state, action) => {
            state.editSectionForm = action.payload;
        },
        setEditSectionFormItem: (state, action) => { // { year: 2025 }
            state.editSectionForm = {...state.editSectionForm, ...action.payload }
        },
        addScheduleIntoEditSectionForm: (state, action) => {
            let schedules = state.editSectionForm.schedules;
            state.editSectionForm.schedules = [...schedules, {scheduleId: schedules.length + 1}]
        },
        resetFetchState: (state) => {
            state.postError = null;
            state.postLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateSectionInfo.pending, (state) => {
                state.postLoading = true;
                state.postError = false;
            })
            .addCase(updateSectionInfo.rejected, (state, { payload }) => {
                state.postLoading = false;
                state.postError = payload;
            })
    }
});

export const {
    setEditSectionForm,
    setEditSectionFormItem,
    resetFetchState,

} = editSectionSlice.actions;
export default editSectionSlice.reducer;