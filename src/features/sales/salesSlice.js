import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sales_dr: "",
    sales_invoice: "",
    sales_date: "",
    customer: "",
    products: [{ product: '', sales_quantity: 0, unit_price: 0, unit_cost: 0, total_cost: 0 }],
    gross_price: 0,
    sales_VAT: 0,
    total_price: 0,
    tax_percent: 12,
}


export const salesSlice = createSlice({
    name: 'sales',
    initialState: initialState,
    reducers: {
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