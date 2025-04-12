import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentByAccount } from "../../apis/studentApi";

 
export const studentInfoSlice = createSlice({
    name: 'studentInfo',
    initialState: {

        myInfo: {
            // studentId: 'N22DCCN156',
            // studentName: 'Phạm Tấn Nguyên',
            // majorName: 'Ngành công nghệ thông tin',
            // classId: 'D22CQCN02-N',
            // accumulateCredits: 123,
            // currentSemester: 2,
            // currentYear: 3
            // educationProgramId: 10001
            // specialization: 10001
        }, 

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchStudentByAccount.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.myInfo = payload.data;
            })
    }
});


export const {} = studentInfoSlice.actions;
export default studentInfoSlice.reducer;