import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        message: '',
        variant: 'info', // 'success', 'error', 'warning', 'info'
        open: false,
        autoHideDuration: 5000,
    },
    reducers: {
        showSnackbar: (state, action) => {
            state.message = action.payload.message;
            state.variant = action.payload.variant;
            state.open = true;
            state.autoHideDuration = action.payload.autoHideDuration;
        },
        hideSnackbar: (state) => {
            state.open = false;
            state.message = '';
            state.variant = 'info';
        },
    },
});

export const selectSnackbar = (state) => state.snackbar;

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
