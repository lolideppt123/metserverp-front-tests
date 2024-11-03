import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sales: [],
    salesObj: {
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

}


export const salesSlice = createSlice({
    name: 'sales',
    initialState: initialState,
    reducers: {
        populateSales: (state, { payload }) => {
            state.sales = payload;
        },
        saveForm: (state, { payload }) => {
            state.salesObj = payload
        },
        salesFormReset: () => initialState
    }
})


export const selectSalesFormState = (state) => state.sales;

export const { saveForm, salesFormReset } = salesSlice.actions;

export default salesSlice.reducer