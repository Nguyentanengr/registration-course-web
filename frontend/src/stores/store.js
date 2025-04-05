import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import sectionReducer from "./slices/sectionSlice";
import scheduleReducer from "./slices/scheduleSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        section: sectionReducer,
        schedule: scheduleReducer,
    },
});