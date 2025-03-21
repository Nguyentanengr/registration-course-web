import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "../../apis/singleUserApi";


const initialState = {
    user: null,
    message: null,
    isLoading: false,
    isSuccess: false,
    isError: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserState: (state) => {
            isLoading = false;
            isSuccess = false;
            isError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getUserProfile.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = payload.message;
                state.user = payload.data.user;
            })
            .addCase(getUserProfile.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = payload;
            });
    }
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;