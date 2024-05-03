import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import axios from 'axios';

const initialState = {
    loading: false,
    customers: [],
    error: ''
}

export const fetchCustomers = createAsyncThunk('customer/fetchCustomers', async () => {
    const { loading, response, setResponse, error, axiosFetch } = useAxiosFunction();
    await axiosFetch({ url: 'customers/', method: 'get' })
    // console.log(response)
    return response;
    // return axios.get('http://127.0.0.1:8000/customers/')
    //     .then((response) => response.data)
})


const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCustomers.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            state.loading = false;
            state.customers = action.payload;
            state.error = '';
        })
        builder.addCase(fetchCustomers.rejected, (state, action) => {
            state.loading = false
            state.customers = [];
            state.error = action.error.message
        })
    }
})

export const getAllCustomers = (state) => state.customer.customers
export const getCustomerLoading = (state) => state.customer.loading
export const getCustomerError = (state) => state.customer.error

export const getCustomerState = (state) => state.customer

export default customerSlice.reducer