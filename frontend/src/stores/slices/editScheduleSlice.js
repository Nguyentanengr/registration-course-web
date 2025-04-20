import { createSlice } from "@reduxjs/toolkit";
import { fetchTeacherForCourse } from "../../apis/teacherApi";
import { fetchAllPlaces } from "../../apis/placeApi";
import { updateScheduleOnSection } from "../../apis/scheduleApi";

export const editScheduleSlice = createSlice({
    name: "editSchedule",
    initialState: {
        counter: 1,
        postLoading: false,
        postError: null,
        schedules: [],
        teachers: [],
        places: [],
        addScheduleForm: {},
    },
    reducers: {
        setSchedules: (state, action) => {
            state.schedules = action.payload;
        },
        setScheduleForm: (state, action) => {
            state.addScheduleForm = action.payload;
        },
        setScheduleFormItem: (state, action) => {
            state.addScheduleForm = {...state.addScheduleForm, ...action.payload};
        },
        addSchedule: (state, action) => {
            const schedules = state.schedules;
            state.schedules = [...schedules, {scheduleId: state.counter, ...action.payload}];
            state.counter += 1;
        },
        removeSchedule: (state, action) => {
            state.schedules = state.schedules.filter(s => s.scheduleId !== action.payload);
        },
        resetFetchState: (state) => {
            state.postError = null;
            state.postLoading = false;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeacherForCourse.fulfilled, (state, { payload }) => {
                state.teachers = payload.data;
            })
            .addCase(fetchAllPlaces.fulfilled, (state, { payload }) => {
                state.places = payload.data;
            })
            .addCase(updateScheduleOnSection.pending, (state, { payload }) => {
                state.postLoading = true;
                state.postError = null;
            })
            .addCase(updateScheduleOnSection.rejected, (state, { payload }) => {
                state.postLoading = false;
                state.postError = payload;
            })
    }
    

});

export const {
    setSchedules,
    setScheduleForm,
    setScheduleFormItem,
    addSchedule,
    removeSchedule,
    resetFetchState
} = editScheduleSlice.actions;
export default editScheduleSlice.reducer;