import { createSlice } from "@reduxjs/toolkit";
import { createPhase, deletePhase, fetchAllPhase, updatePhase } from "../../apis/phaseApi";
import { FaLeaf } from "react-icons/fa";

const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const day = String(tomorrow.getDate()).padStart(2, '0');
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
    const year = tomorrow.getFullYear();
    return `${year}-${month}-${day}T00:00:00`;
};

const phaseSlice = createSlice({
    name: 'phase',
    initialState: {

        // get method
        searchKey: '',
        getLoading: false,
        deleteLoading: false,
        deleteError: null,
        updateLoading: false,
        updateError: null,
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
            openTime: getTomorrow(),
            closeTime: getTomorrow(),
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
        deletePhaseItem: (state, action) => {
            state.phases = state.phases.filter(p => p.phaseId !== action.payload);
        },
        resetPhaseForm: (state) => {
            state.phaseForm = {
                name: '',
                year: null,
                semester: null,
                openTime: "2025-06-14T23:59:59",
                closeTime: "2025-06-24T23:59:59"
            };
        },
        resetFetchState: (state) => {
            state.updateError = null;
            state.updateLoading = false;
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
            .addCase(deletePhase.pending, (state) => {
                state.deleteError = null;
                state.deleteLoading = true;
            })
            .addCase(deletePhase.fulfilled, (state, { payload }) => {
                state.deleteError = null;
                state.deleteLoading = false;
            })
            .addCase(deletePhase.rejected, (state, { payload }) => {
                state.deleteError = payload;
                state.deleteLoading = false;
            })
            .addCase(updatePhase.pending, (state) => {
                state.updateError = null;
                state.updateLoading = true;
            })
            .addCase(updatePhase.fulfilled, (state, { payload }) => {
                state.updateError = null;
                state.updateLoading = false;
            })
            .addCase(updatePhase.rejected, (state, { payload }) => {
                state.updateError = payload;
                state.updateLoading = false;
            })


    }

});

export const {
    resetFetchState,
    addPhase,
    setFilterYear,
    setSearchKey,
    setPhaseForm,
    deletePhaseItem,
    resetPhaseForm } = phaseSlice.actions;
export default phaseSlice.reducer;