import { createSlice } from "@reduxjs/toolkit";
import { fetchScheduleOnSection } from "../../apis/scheduleApi";

export const dowVieToEng = {
    "Thứ 2": "MONDAY",
    "Thứ 3": "TUESDAY",
    "Thứ 4": "WEDNESDAY",
    "Thứ 5": "THURSDAY",
    "Thứ 6": "FRIDAY",
    "Thứ 7": "SATURDAY",
    "Chủ nhật": "SUNDAY"
};

export const dowEngToVie = {
    "MONDAY": "Thứ 2",
    "TUESDAY": "Thứ 3",
    "WEDNESDAY": "Thứ 4",
    "THURSDAY": "Thứ 5",
    "FRIDAY": "Thứ 6",
    "SATURDAY": "Thứ 7",
    "SUNDAY": "Chủ nhật"
};

const scheduleSlice = createSlice({
    name: "schedule",
    initialState: {
        startPeriods: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        startPeriods: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        dayOfWeeks: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
        addScheduleForm: {
            dayOfWeek: null,
            startPeriod: 1,
            endPeriod: 4,
            startDate: null,
            endDate: null,
            teacherId: null,
            placeId: null,
        },
        errorScheduleOnSection: null,
        loadingScheduleOnSection: false,
        schedulesOnSection: [
        ],
    },
    reducers: {
        addDayOfWeek: (state, action) => {
            state.addScheduleForm.dayOfWeek = dowVieToEng[action.payload];
        },
        addStartPeriod: (state, action) => {
            state.addScheduleForm.startPeriod = action.payload;
        },
        addEndPeriod: (state, action) => {
            state.addScheduleForm.endPeriod = action.payload;
        },
        addStartDate: (state, action) => {
            state.addScheduleForm.startDate = action.payload;
        },
        addEndDate: (state, action) => {
            state.addScheduleForm.endDate = action.payload;
        },
        addTeacherId: (state, action) => {
            state.addScheduleForm.teacherId = action.payload;
        },
        addPlaceId: (state, action) => {
            state.addScheduleForm.placeId = action.payload;
        },
        resetScheduleOnSection: (state) => {
            state.errorScheduleOnSection = null;
            state.loadingScheduleOnSection = false;
            state.schedulesOnSection = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScheduleOnSection.pending, (state) => {
                state.loadingScheduleOnSection = true;
            })
            .addCase(fetchScheduleOnSection.fulfilled, (state, {payload}) => {
                console.log("Result: ", payload);
                state.loadingScheduleOnSection = false;
                state.schedulesOnSection = payload.data;
            })
            .addCase(fetchScheduleOnSection.rejected, (state, { payload }) => {
                state.loadingScheduleOnSection = false;
                state.errorScheduleOnSection = payload;
            })
    }
});

export const { addDayOfWeek, addEndDate, addStartDate, addEndPeriod
    , addStartPeriod, addTeacherId, addPlaceId, resetScheduleOnSection } = scheduleSlice.actions;

export default scheduleSlice.reducer;