import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import sectionReducer from "./slices/sectionSlice";
import scheduleReducer from "./slices/scheduleSlice";
import authReducer from "./slices/authSlice";
import phaseReducer from "./slices/phaseSlice";
import openSectionReducer from "./slices/openSectionSlice";
import studentListReducer from "./slices/studentListSlice";
import studentInfoReducer from "./slices/studentInfoSlice";
import registerReducer from "./slices/registerSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        section: sectionReducer,
        schedule: scheduleReducer,
        phase: phaseReducer,
        openSection: openSectionReducer,
        studentList: studentListReducer,
        studentInfo: studentInfoReducer,
        register: registerReducer,
    },
});