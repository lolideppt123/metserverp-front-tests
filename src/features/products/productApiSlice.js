import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Products', 'Dictionary'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllProduct: builder.query({
                query: () => ({
                    url: 'products/',
                    method: 'GET',
                }),
                providesTags: ['Products']
            }),
            getProduct: builder.query({
                query: (id) => ({
                    url: `products/${id}`,
                    method: 'GET',
                }),
                providesTags: ['Products']
            }),
            addProduct: builder.mutation({
                query: (product) => ({
                    url: `products/`,
                    method: 'POST',
                    body: product,
                }),
                invalidatesTags: ['Products', 'Dictionary']
            }),
            updateProduct: builder.mutation({
                query: (product) => ({
                    url: `products/${product.id}`,
                    method: 'PATCH',
                    body: product,
                }),
                invalidatesTags: ['Products']
            }),
            deleteProduct: builder.mutation({
                query: (id) => ({
                    url: `products/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Products']
            }),
        })
    })

export const {
    useGetAllProductQuery,
    useGetProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApiSlice;