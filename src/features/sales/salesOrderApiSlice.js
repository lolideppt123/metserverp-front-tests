import { apiSlice } from "../../app/api/apiSlice";

export const salesOrderApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Invoice', 'Sales'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllSalesOrder: builder.query({
                query: () => ({
                    url: 'sales-invoice/',
                    method: 'GET'
                }),
                providesTags: ['Invoice']
            }),
            getSalesOrderItem: builder.query({
                query: (invoice_pk) => ({
                    url: `sales-invoice/${invoice_pk}`,
                    method: 'GET'
                }),
                providesTags: (result, error, invoice_pk) => [{ type: 'Invoice', id: invoice_pk }]
            }),
            updateSalesOrderStatus: builder.mutation({
                query: (sales_order) => ({
                    url: `sales-invoice/${sales_order.id}`,
                    method: 'PATCH',
                    body: sales_order
                }),
                invalidatesTags: ['Invoice', { type: 'Sales', id: 'LIST' }],
            }),
            deleteSalesOrder: builder.mutation({
                query: (id) => ({
                    url: `sales-invoice/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Invoice']
            })
        })
    })

export const {
    useGetAllSalesOrderQuery,
    useGetSalesOrderItemQuery,
    useUpdateSalesOrderStatusMutation,
    useDeleteSalesOrderMutation,
} = salesOrderApiSlice;