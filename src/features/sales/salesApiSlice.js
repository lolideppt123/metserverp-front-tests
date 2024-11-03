import { apiSlice } from "../../app/api/apiSlice";

export const salesApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Sales'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllSales: builder.query({
                query: () => ({
                    url: 'sales/',
                    method: 'GET',
                }),
                providesTags: ['Sales']
            }),
            getAllSalesYear: builder.query({
                query: (year) => ({
                    url: `sales/${year}`,
                    method: 'GET',
                }),
                providesTags: ['Sales']
            }),
            getSalesFilteredDraft: builder.query({
                query: (filters) => {
                    const queryParams = new URLSearchParams();

                    // Append filters to URLSearchParams
                    if (filters.salesInvoice && filters.salesInvoice.length > 0) {
                        filters.salesInvoice.forEach(invoice => queryParams.append('salesInvoice', invoice));
                    }
                    if (filters.customer) {
                        filters.customer.forEach(customer => queryParams.append('customer', customer));
                    }
                    if (filters.productName && filters.productName.length > 0) {
                        filters.productName.forEach(product => queryParams.append('productName', product));
                    }
                    if (filters.dateFilter) {
                        queryParams.append('dateFilter', filters.dateFilter);
                    }


                    return `draft-sales/?${queryParams.toString()}`;
                },
                providesTags: (result, error, filters) => [{ type: 'Sales', id: 'LIST' }],
            }),
            getSales: builder.query({
                query: (id) => ({
                    url: `sales/transaction/${id}/edit`,
                    method: 'GET',
                }),
                providesTags: ['Sales']
            }),
            getSalesFilteredByData: builder.query({
                query: (payload) => ({
                    url: `sales-data-filter/`,
                    method: 'POST',
                    body: payload,
                }),
            }),
            addSales: builder.mutation({
                query: (supplier) => ({
                    url: `sales/`,
                    method: 'POST',
                    body: supplier,
                }),
                invalidatesTags: ['Sales']
            }),
            updateSales: builder.mutation({
                query: (supplier) => ({
                    url: `sales/transaction/${id}/edit`,
                    method: 'PUT', //change later
                    body: supplier,
                }),
                invalidatesTags: ['Sales']
            }),
            deleteSales: builder.mutation({
                query: ({ id }) => ({
                    url: `sales/transaction/${id}/edit`,
                    method: 'GET',
                }),
                invalidatesTags: ['Sales']
            }),
        })
    })

export const {
    useGetAllSalesQuery,
    useGetAllSalesYearQuery,
    useGetSalesQuery,
    useGetSalesFilteredByDataQuery,
    useAddSalesMutation,
    useUpdateSalesMutation,
    useDeleteSalesMutation,

    useGetSalesFilteredDraftQuery
} = salesApiSlice;