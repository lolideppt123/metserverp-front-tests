import { apiSlice } from "../../app/api/apiSlice";

export const inventoryApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Inventory', 'InventoryProduct', 'MaterialInventory', 'MaterialHistory'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllInventoryProducts: builder.query({
                query: () => ({
                    url: 'inventory/products/',
                    method: 'GET',
                }),
                providesTags: ['Inventory']
            }),
            getInventoryProductHistory: builder.query({
                query: (product_pk) => ({
                    url: `inventory/products/transaction/${product_pk}`,
                    method: 'GET',
                }),
                // Provides a specific tag for this product's inventory history
                providesTags: (result, error, product_pk) => [{ type: 'Inventory', id: product_pk }]
            }),
            addInventoryProduct: builder.mutation({
                query: (inventory) => ({
                    url: 'inventory/products/',
                    method: 'POST',
                    body: inventory
                }),
                invalidatesTags: ['Inventory', 'MaterialHistory']
            }),
            getInventoryProductItem: builder.query({
                query: (product_inventory_pk) => ({
                    url: `inventory/products/${product_inventory_pk}`,
                    method: 'GET'
                }),
                providesTags: (result, error, product_inventory_pk) => [{ type: 'Inventory', id: product_inventory_pk }]
            }),
            updateInventoryProductItem: builder.mutation({
                query: (product_inventory) => ({
                    url: `inventory/products/${product_inventory.pk}`,
                    method: 'PATCH',
                    body: product_inventory
                }),
                invalidatesTags: (result, error, product_inventory) => {
                    const product_pk = result?.product_pk;
                    return [{ type: 'Inventory', id: product_pk }, { type: 'Inventory' }]
                }
            }),
            deleteInventoryProduct: builder.mutation({
                query: (id) => ({
                    url: `inventory/products/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: (result, error, id) => {
                    const product_pk = result?.product_pk;
                    return [
                        { type: 'Inventory' },
                        { type: 'Inventory', id: product_pk },
                        { type: 'MaterialHistory' },
                        { type: 'MaterialInventory' },
                    ]
                }
            })

        })
    })


export const {
    useGetAllInventoryProductsQuery,
    useGetInventoryProductHistoryQuery,
    useGetInventoryProductItemQuery,
    useAddInventoryProductMutation,
    useUpdateInventoryProductItemMutation,
    useDeleteInventoryProductMutation,
} = inventoryApiSlice;