import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import sectionReducer from "./slices/sectionSlice";
import scheduleReducer from "./slices/scheduleSlice";
import authReducer from "./slices/authSlice";
import phaseReducer from "./slices/phaseSlice";
import openSectionReducer from "./slices/openSectionSlice"

export default configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        section: sectionReducer,
        schedule: scheduleReducer,
        phase: phaseReducer,
        openSection: openSectionReducer,
    },
});