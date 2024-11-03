import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "./authSlice";
import { jwtDecode } from "jwt-decode";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'authentication/login/',
                method: 'POST',
                body: { ...credentials },
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ token: data, user: jwtDecode(data.access).email }));
                } catch (error) {
                    console.error('Login failed:', error); // Handle error appropriately
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
