import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sales: []
}


export const salesSlice = createSlice({
    name: 'sales',
    initialState: initialState,
    reducers: {
        populateSales: (state, { payload }) => {
            state.sales = payload;
        },
        saveForm: (state, { payload }) => {
            state.sales_dr = payload.sales_dr
            state.sales_invoice = payload.sales_invoice
            state.sales_date = payload.sales_date
            state.customer = payload.customer
            state.products = payload.products
            state.gross_price = payload.gross_price
            state.sales_VAT = payload.sales_VAT
            state.total_price = payload.total_price
            state.tax_percent = payload.tax_percent
        },
        salesFormReset: () => initialState
    }
})


export const selectSalesFormState = (state) => state.sales;

export const { saveForm, salesFormReset } = salesSlice.actions;

export default salesSlice.reducer