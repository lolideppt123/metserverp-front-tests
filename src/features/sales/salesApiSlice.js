import { apiSlice } from "../../app/api/apiSlice";

export const salesApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Sales', 'Inventory'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllSales: builder.query({ // returns all sales without any filter
                query: () => ({
                    url: 'sales/',
                    method: 'GET',
                }),
                providesTags: ['Sales']
            }),
            getSalesFilteredData: builder.query({
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

                    return `sales/?${queryParams.toString()}`;
                },
                providesTags: (result, error, filters) => [{ type: 'Sales', id: 'LIST' }],
            }),
            getSalesItem: builder.query({
                query: (sales_pk) => ({
                    url: `sales/transaction/${sales_pk}/edit`,
                    method: 'GET',
                }),
                providesTags: (result, error, sales_pk) => [{ type: 'Sales', id: sales_pk }]
            }),
            addSales: builder.mutation({
                query: (sales) => ({
                    url: `sales/`,
                    method: 'POST',
                    body: sales,
                }),
                invalidatesTags: ['Sales', 'Inventory']
            }),
            updateSalesItem: builder.mutation({
                query: (sales) => ({
                    url: `sales/transaction/${sales.pk}/edit`,
                    method: 'PATCH',
                    body: sales,
                }),
                invalidatesTags: (result, error, sales) => {
                    // Invalidate getInventoryProductHistory 
                    const product_pk = sales?.sales_transaction[0].product_name?.id;
                    const invalidateTag = { type: 'Inventory', id: product_pk };

                    return [{ type: 'Sales', id: 'LIST' }, { type: 'Sales', id: sales.pk }, invalidateTag]
                }
            }),
            deleteSales: builder.mutation({
                query: (id) => ({
                    url: `sales/transaction/${id}/edit`,
                    method: 'DELETE',
                }),
                // Invalidates the cache of sales and related inventory
                invalidatesTags: (result, error, id) => {

                    // Extract product_pk from the deleted sale's transaction data
                    const product_pk = result?.product_pk;

                    // If product_pk is available, invalidate the corresponding inventory tag
                    // this invalidates "getInventoryHistory"
                    return [
                        { type: 'Sales', id: 'LIST' },
                        ...(product_pk ? [{ type: 'Inventory', id: product_pk }] : [])
                    ];
                }
            }),
        })
    })

export const {
    useGetAllSalesQuery,
    useGetSalesItemQuery,
    useAddSalesMutation,
    useUpdateSalesItemMutation,
    useDeleteSalesMutation,

    useGetSalesFilteredDataQuery
} = salesApiSlice;