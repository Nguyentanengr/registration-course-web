import { createSlice } from "@reduxjs/toolkit";
import { fetchRegisteredOpenSection, fetchRegisterOpenSection } from "../../apis/openSectionApi";
import { postRegister } from "../../apis/registerApi";


export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        listOpenSession: {
            startTime: '2025-08-12T14:00:45',
            endTime: '2025-04-13T01:12:00',
            postError: null,
            openSessions: []
        },

        registeredSections: []
    },
    reducers: {
        setPostError: ((state, action) => {
            state.postError = action.payload;
        }),
        addRegisteredSession: ((state, action) => {
            state.registeredSections = [...state.registeredSections, action.payload];
        }),
        removeRegisteredSession: ((state, action) => {
            state.registeredSections = state.registeredSections.filter(r => r.openSessionId != action.payload);
        }),
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchRegisterOpenSection.fulfilled, (state, { payload }) => {
                console.log(payload.data);
                state.listOpenSession = payload.data;
            })
            .addCase(postRegister.rejected, (state, { payload }) => {
                state.postError = payload;
            })
            .addCase(fetchRegisteredOpenSection.fulfilled, (state, { payload }) => {
                state.registeredSections = payload.data;
            })
    }
});


export const { setPostError, addRegisteredSession, removeRegisteredSession } = registerSlice.actions;
export default registerSlice.reducer;