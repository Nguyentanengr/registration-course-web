import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../../apis/authApi";


// Lưu token và user vào local storage để tránh mất đi khi refresh trang.
// Tự động load lại khi reload trang.
const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;




const authSlice = createSlice({
    name: "auth",
    initialState: {
        user, // lấy trực tiếp từ biến ở trên để chúng đồng bộ với nhau
        token, // lấy trực tiếp từ biến ở trên để chúng đồng bộ với nhau
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.data.user;
                state.token = payload.data.token;
                localStorage.setItem('user', JSON.stringify(payload.data.user));
                localStorage.setItem('token', JSON.stringify(payload.data.accessToken));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // chứa đối tượng {code: 9090, message: 'error'}
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.error = null;
                state.token = null;
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            })

            ;
    },

});

export const { logout } = authSlice.actions;
export default authSlice.reducer;