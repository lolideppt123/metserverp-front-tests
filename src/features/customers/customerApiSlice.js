import { apiSlice } from "../../app/api/apiSlice";

export const customerApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Customers'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllCustomer: builder.query({
                query: () => ({
                    url: 'customers/',
                    method: 'GET',
                }),
                // providesTags: ['Customers']
                providesTags: (result = [], error, arg) =>
                    result
                        ? [...result.map(({ id }) => ({ type: 'Customers', id })), 'Customers']
                        : ['Customers']
            }),
            getCustomer: builder.query({
                query: (id) => ({
                    url: `customers/${id}`,
                    method: 'GET',
                }),
                providesTags: ['Customers']
                // providesTags: (result, error, arg) => [{ type: 'Customers', id: arg }]
            }),
            addCustomer: builder.mutation({
                query: (customer) => ({
                    url: `customers/`,
                    method: 'POST',
                    body: customer,
                }),
                invalidatesTags: ['Customers']
            }),
            updateCustomer: builder.mutation({
                query: (customer) => ({
                    url: `customers/${customer.id}`,
                    method: 'PATCH',
                    body: customer,
                }),
                invalidatesTags: ['Customers']
                // invalidatesTags: (result, error, arg) => [{ type: 'Customers', id: arg.id }]
            }),
            deleteCustomer: builder.mutation({
                query: ({ id }) => ({
                    url: `customers/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Customers']
            }),
        })
    })

export const {
    useGetAllCustomerQuery,
    useGetCustomerQuery,
    useAddCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} = customerApiSlice;