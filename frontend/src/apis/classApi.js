    import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_ALL_CLASS_INFO_API = `${import.meta.env.VITE_API_URL}/api/v1/classes`;
export const GET_CLASS_ACTIVE_API = `${import.meta.env.VITE_API_URL}/api/v1/classes/active`;
export const GET_CLASS_ACTIVE_INFO_API = `${import.meta.env.VITE_API_URL}/api/v1/classes/active-info`;

export const fetchActiveClassIds = createAsyncThunk('classes/getActiveClassIds',
    async (_, { rejectWithValue }) => {
        try {
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(GET_CLASS_ACTIVE_API, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorized": "Bearer " + TOKEN,
                },
            });
            const objectResponse = await response.json();
            if (objectResponse.code != 1000) {
                return rejectWithValue({
                    code: objectResponse.code,
                    message: objectResponse.message,
                });
            }
            return objectResponse;
        } catch (error) {
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
    });

export const fetchActiveClassInfos = createAsyncThunk('classes/getActiveClassInfo',
    async (_, { rejectWithValue }) => {
        try {
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(GET_CLASS_ACTIVE_INFO_API, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorized": "Bearer " + TOKEN,
                },
            });
            const objectResponse = await response.json();
            if (objectResponse.code != 1000) {
                return rejectWithValue({
                    code: objectResponse.code,
                    message: objectResponse.message,
                });
            }
            return objectResponse;
        } catch (error) {
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
    });

export const fetchAllClassInfos = createAsyncThunk('classes/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(GET_ALL_CLASS_INFO_API, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorized": "Bearer " + TOKEN,
                },
            });
            const objectResponse = await response.json();
            if (objectResponse.code != 1000) {
                return rejectWithValue({
                    code: objectResponse.code,
                    message: objectResponse.message,
                });
            }
            return objectResponse.data.map((cl) => cl.clazzId);
        } catch (error) {
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
    });