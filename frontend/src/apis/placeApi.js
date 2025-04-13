import { createAsyncThunk } from "@reduxjs/toolkit";

export const GET_PLACES_API = `${import.meta.env.VITE_API_URL}/api/v1/places`;

export const fetchAllPlaces = createAsyncThunk('places/getAllPlaces',
    async (_, { rejectWithValue }) => {
        try {
            const TOKEN = localStorage.getItem('token');
            console.log(GET_PLACES_API);
            const response = await fetch(GET_PLACES_API, {
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