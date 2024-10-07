import { apiSlice } from "../../app/api/apiSlice";

export const unitApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Units', 'UCategory'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllUnits: builder.query({
                query: () => ({
                    url: 'products/unit',
                    method: 'GET',
                }),
            }),
            getAllUCategory: builder.query({
                query: () => ({
                    url: 'products/unitcategory',
                    method: 'GET',
                }),
            }),
        })
    })

export const {
    useGetAllUnitsQuery,
    useGetAllUCategoryQuery,
} = unitApiSlice;