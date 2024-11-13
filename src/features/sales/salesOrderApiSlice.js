import { apiSlice } from "../../app/api/apiSlice";

export const salesOrderApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Invoice'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllSalesOrder: builder.query({
                query: () => ({
                    url: 'sales-invoice/',
                    method: 'GET'
                }),
                providesTags: ['Invoice']
            }),
            updateSalesOrderStatus: builder.mutation({
                query: (sales_order) => ({
                    url: `sales-invoice/${sales_order.id}`,
                    method: 'PATCH',
                    body: sales_order
                }),
                invalidatesTags: ['Invoice']
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
    useUpdateSalesOrderStatusMutation,
    useDeleteSalesOrderMutation,
} = salesOrderApiSlice;