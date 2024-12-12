import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "./authSlice";
import { jwtDecode } from "jwt-decode";


// Utility function to get CSRF token from cookies
function getCSRFToken() {
    const match = document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'));
    return match ? match[2] : null;
}


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => {
                const csrfToken = getCSRFToken();

                return {
                    url: 'authentication/login/',
                    method: 'POST',
                    body: { ...credentials },
                    headers: { 'X-CSRFToken': csrfToken }
                }
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ token: data, user: jwtDecode(data.access) }));
                } catch (error) {
                    console.error('Login failed:', error); // Handle error appropriately
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
