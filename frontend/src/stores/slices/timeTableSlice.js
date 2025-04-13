import { createSlice } from "@reduxjs/toolkit";
import { fetchTimeTable } from "../../apis/timeTableApi";

export const timeTableSlice = createSlice({
    name: 'timeTable',
    initialState: {
        semesterYear: null,
        selectedWeek: null,
        timeTables: [],
    },
    reducers: {
        setSemesterYear: (state, action) => {
            state.semesterYear = action.payload;
        },
        setSelectedWeek: (state, action) => {
            state.selectedWeek = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchTimeTable.fulfilled, (state, { payload }) => {
                state.timeTables = payload.data;
            })
    }



});

export const { setSemesterYear, setSelectedWeek } = timeTableSlice.actions;
export default timeTableSlice.reducer;