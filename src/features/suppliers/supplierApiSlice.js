import { apiSlice } from "../../app/api/apiSlice";

export const supplierApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Suppliers'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllSupplier: builder.query({
                query: () => ({
                    url: 'suppliers/',
                    method: 'GET',
                }),
                providesTags: ['Suppliers']
            }),
            getSupplier: builder.query({
                query: (id) => ({
                    url: `suppliers/${id}`,
                    method: 'GET',
                }),
                providesTags: ['Suppliers']
            }),
            addSupplier: builder.mutation({
                query: (supplier) => ({
                    url: `suppliers/`,
                    method: 'POST',
                    body: supplier,
                }),
                invalidatesTags: ['Suppliers']
            }),
            updateSupplier: builder.mutation({
                query: (supplier) => ({
                    url: `suppliers/${supplier.id}`,
                    method: 'PATCH',
                    body: supplier,
                }),
                invalidatesTags: ['Suppliers']
            }),
            deleteSupplier: builder.mutation({
                query: ({ id }) => ({
                    url: `suppliers/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Suppliers']
            }),
        })
    })

export const {
    useGetAllSupplierQuery,
    useGetSupplierQuery,
    useAddSupplierMutation,
    useUpdateSupplierMutation,
    useDeleteSupplierMutation,
} = supplierApiSlice;