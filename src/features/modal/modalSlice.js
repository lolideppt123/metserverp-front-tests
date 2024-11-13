import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: {
        isOpen: false,
    },
    delete: {
        isOpen: false,
    },
    form: {
        isOpen: false,
    }
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        modalShow: (state, { payload }) => {
            state.show.isOpen = payload;
        },
        modalDelete: (state, { payload }) => {
            state.delete.isOpen = payload;
        },
        modalForm: (state, { payload }) => {
            state.form.isOpen = payload;
        },
    }
})

export const selectModalShow = (state) => state.modal.show.isOpen;
export const selectModalDelete = (state) => state.modal.delete.isOpen;
export const selectModalForm = (state) => state.modal.form.isOpen;

export const { modalShow, modalDelete, modalForm } = modalSlice.actions;
export default modalSlice.reducer;