import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    units: [],
    category: []
}

export const denominationSlice = createSlice({
    name: 'denomination',
    initialState: initialState,
    reducers: {
        populateState: (state, { payload }) => {
            state.units = payload.units;
            state.category = payload.category;
        }
    }
})

export const selectUnitsState = (state) => state.denomination.units;
export const selectCategoryState = (state) => state.denomination.category;
export const selectDenomination = (state) => state.denomination;

export const { populateState } = denominationSlice.actions;

export default denominationSlice.reducer;