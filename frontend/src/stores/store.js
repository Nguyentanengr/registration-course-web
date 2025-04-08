import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import sectionReducer from "./slices/sectionSlice";
import scheduleReducer from "./slices/scheduleSlice";
import authReducer from "./slices/authSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        section: sectionReducer,
        schedule: scheduleReducer,

    },
});