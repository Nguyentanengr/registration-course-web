import { createAsyncThunk } from "@reduxjs/toolkit";

const LOGIN_API = "http://localhost:8080/api/v1/auth/login";
const LOGOUT_API = "http://localhost:8080/api/v1/auth/logout";

export const loginUser = createAsyncThunk("auth/loginUser",
    async ({ username, password }, { rejectWithValue }) => { // para 1 : request body
        try {
            const response = await fetch(LOGIN_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const objectResponse = await response.json();

            // mã phản hồi lỗi thông báo đăng nhập thất bại
            if (objectResponse.code != 1000) {
                return rejectWithValue({
                    code: objectResponse.code,
                    message: objectResponse.message || "Đăng nhập thất bại"
                });
            };
            return objectResponse;
        } catch (error) {
            // lỗi mạng hoặc lỗi sự cố khi truyền mạng
            return rejectWithValue({
                code: 9900,
                message: error.message || "Lỗi kết nối tới server"
            });
        }
    });

export const logoutUser = createAsyncThunk("auth/logoutUser",
    async (_, { rejectWithValue }) => { // para 1 : non body
        try {

            console.log("Starting logout ...");
            const response = await fetch(LOGOUT_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Gửi refresh token cho server để vô hiệu hóa
            });
            
            const objectResponse = await response.json();
            console.log("Receive result from server: ", objectResponse);

            // server luôn phản hồi về mã 1000
            console.log(objectResponse);

            return objectResponse;
        } catch (error) {
            // lỗi mạng hoặc lỗi sự cố khi truyền mạng
            return rejectWithValue({
                code: 9900,
                message: error.message || "Lỗi kết nối tới server"
            });
        }
    });

