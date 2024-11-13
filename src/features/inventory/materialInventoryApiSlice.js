import { apiSlice } from "../../app/api/apiSlice";

export const materialInventoryApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['MaterialInventory', 'MaterialHistory'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllInventoryMaterials: builder.query({
                query: () => ({
                    url: 'inventory/materials/',
                    method: 'GET',
                }),
                providesTags: ['MaterialInventory']
            }),
            getInventoryMaterialHistory: builder.query({
                query: (material_pk) => ({
                    url: `inventory/materials/transaction/${material_pk}`,
                    method: 'GET'
                }),
                providesTags: (result, error, material_pk) => [{ type: 'MaterialHistory' }, { type: 'MaterialInventory', id: material_pk }]
            }),
            addInventoryMaterial: builder.mutation({
                query: (material_inventory) => ({
                    url: 'inventory/materials/',
                    method: 'POST',
                    body: material_inventory
                }),
                invalidatesTags: ['MaterialInventory']
            }),
            getInventoryMaterialItem: builder.query({
                query: (material_inventory_pk) => ({
                    url: `inventory/materials/${material_inventory_pk}`,
                    method: 'GET'
                }),
                providesTags: (result, error, material_inventory_pk) => [{ type: 'MaterialInventory', id: material_inventory_pk }]
            }),
            updateInventoryMaterialItem: builder.mutation({
                query: (material_inventory) => ({
                    url: `inventory/materials/${material_inventory.pk}`,
                    method: 'PATCH',
                    body: material_inventory
                }),
                invalidatesTags: (result, error, id) => {
                    const material_pk = result?.material_pk;
                    return [{ type: 'MaterialInventory', id: material_pk }]
                }
            }),
            deleteInventoryMaterial: builder.mutation({
                query: (id) => ({
                    url: `inventory/materials/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: (result, error, id) => {
                    const material_pk = result?.material_pk;
                    return [
                        { type: 'MaterialInventory' },
                        { type: 'MaterialInventory', id: material_pk }
                    ]
                }
            })
        })
    })

export const {
    useGetAllInventoryMaterialsQuery,
    useGetInventoryMaterialHistoryQuery,
    useAddInventoryMaterialMutation,
    useGetInventoryMaterialItemQuery,
    useUpdateInventoryMaterialItemMutation,
    useDeleteInventoryMaterialMutation,
} = materialInventoryApiSlice;