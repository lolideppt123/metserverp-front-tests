import { apiSlice } from "../../app/api/apiSlice";

export const materialApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Materials', 'Dictionary'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllMaterial: builder.query({
                query: () => ({
                    url: 'materials/',
                    method: 'GET',
                }),
                providesTags: ['Materials']
            }),
            getMaterial: builder.query({
                query: (id) => ({
                    url: `materials/${id}`,
                    method: 'GET',
                }),
                providesTags: ['Materials']
            }),
            addMaterial: builder.mutation({
                query: (material) => ({
                    url: `materials/`,
                    method: 'POST',
                    body: material,
                }),
                invalidatesTags: ['Materials', 'Dictionary']
            }),
            updateMaterial: builder.mutation({
                query: (material) => ({
                    url: `materials/${material.id}`,
                    method: 'PATCH',
                    body: material,
                }),
                invalidatesTags: ['Materials']
            }),
            deleteMaterial: builder.mutation({
                query: (id) => ({
                    url: `materials/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Materials']
            }),
        })
    })

export const {
    useGetAllMaterialQuery,
    useGetMaterialQuery,
    useAddMaterialMutation,
    useUpdateMaterialMutation,
    useDeleteMaterialMutation
} = materialApiSlice;