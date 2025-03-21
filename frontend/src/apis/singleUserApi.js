import { createAsyncThunk } from "@reduxjs/toolkit";

const USER_PROFILE_API = "http://localhost:3000/api/v1/users/{}"
const TOKEN = "kexmdk*99Tccxj#kmxx9LbH*$n.sywKnJ86grT6xj#kmxx9LbH*$n.sywKnJ8"

export const getUserProfile = createAsyncThunk("auth/changePassword",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(USER_PROFILE_API, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorized": "Bearer " + TOKEN,
                },
            });
            const objectResponse = await response.json();
            if (objectResponse.code != 1000) throw new Error(objectResponse.message);
            return objectResponse;
        } catch (error) {
            return rejectWithValue(error.message || "Network error");
        }

        // return json object if server response success (code = 1000 || HttpStatus = 200)
        // return message if server response error (code != 1000 || HttpStatus = {401, 403, 404, 500, ...})
    });