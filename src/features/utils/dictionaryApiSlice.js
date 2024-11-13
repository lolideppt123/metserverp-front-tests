import { apiSlice } from "../../app/api/apiSlice";

export const dictionaryApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Dictionary'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getDictionary: builder.query({
                query: () => ({
                    url: "dictionaries/",
                    method: 'GET'
                }),
                providesTags: ['Dictionary']
            }),
        })
    })

export const { useGetDictionaryQuery } = dictionaryApiSlice;