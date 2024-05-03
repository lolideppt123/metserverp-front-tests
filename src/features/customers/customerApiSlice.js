import { apiSlice } from "../../app/api/apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCustomer: builder.query({
            query: () => ({
                url: 'customers/',
                method: 'GET',
            })
        })
    })
})

export const { useGetAllCustomerQuery } = customerApiSlice;