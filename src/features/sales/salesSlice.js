import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";


const currentYear = dayjs().year();
const currentMonth = dayjs().month() + 1;
const initialDateFilter = `${currentYear}-${currentMonth}`;

const initialState = {
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
    },
    salesFilters: {
        dateFilter: initialDateFilter,
        customer: null,
        productName: null,
        salesInvoice: null
    }
}


export const salesSlice = createSlice({
    name: 'sales',
    initialState: initialState,
    reducers: {
        saveForm: (state, { payload }) => {
            state.salesObj = payload
        },
        salesFormReset: (state) => {
            state.salesObj = initialState.salesObj
        },
        updateSalesFilters: (state, { payload }) => {
            state.salesFilters = { ...state.salesFilters, ...payload };
        }
    }
});


export const selectSalesFormState = (state) => state.sales;
export const selectSalesFilters = (state) => state.sales.salesFilters;

export const { saveForm, salesFormReset, updateSalesFilters } = salesSlice.actions;

export default salesSlice.reducer