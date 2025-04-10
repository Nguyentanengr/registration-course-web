import { createSlice } from "@reduxjs/toolkit";
import { createPhase, fetchAllPhase } from "../../apis/phaseApi";
import { FaLeaf } from "react-icons/fa";


const phaseSlice = createSlice({
    name: 'phase',
    initialState: {

        // get method
        searchKey: '',
        getLoading: false,
        phases: [
            {
                phaseId: "10011",
                phaseName: "ĐỢT ĐĂNG KÝ 1 HỌC KÌ 2 NĂM 2025",
                semester: 2,
                year: 2025,
                openTime: "2025-04-09T23:59:59",
                closeTime: "2025-12-24T23:59:59"
            },
            {
                phaseId: "10010",
                phaseName: "ĐỢT ĐĂNG KÝ 1 HỌC KÌ 1 NĂM 2025",
                semester: 1,
                year: 2025,
                openTime: "2025-06-14T23:59:59",
                closeTime: "2025-06-24T23:59:59"
            }
        ],

        // post method
        postLoading: false,
        postError: null,
        phaseForm: {
            name: '',
            year: null,
            semester: null,
            openTime: null,
            closeTime: null,
        },
    },
    reducers: {
        addPhase: (state, action) => {
            state.phases = [...state.phases, action.payload];
        },
        setSearchKey: (state, action) => {
            state.searchKey = action.payload;
        },
        setPhaseForm: (state, action) => {
            state.phaseForm = action.payload;
        },
        resetPhaseForm: (state) => {
            state.phaseForm = {
                name: '',
                year: null,
                semester: null,
                openTime: null,
                closeTime: null,
            };
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPhase.pending, (state) => {
                state.getLoading = true;
            })
            .addCase(fetchAllPhase.fulfilled, (state, { payload }) => {
                console.log(payload.data);
                state.getLoading = false;
                state.phases = payload.data;
            })
            .addCase(createPhase.pending, (state) => {
                state.postLoading = true;
                state.postError = null;
            })
            .addCase(createPhase.fulfilled, (state) => {
                console.log('create phase successfully');
                state.postLoading = false;
                state.postError = null;
            })
            .addCase(createPhase.rejected, (state, { payload }) => {
                state.postLoading = false;
                state.postError = payload;
            })


    }

});

export const { addPhase, setFilterYear, setSearchKey
    , setPhaseForm, resetPhaseForm } = phaseSlice.actions;
export default phaseSlice.reducer;