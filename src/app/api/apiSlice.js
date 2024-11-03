import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';

const baseURL = import.meta.env.VITE_API_BASE_URL

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        console.log(getState());
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token?.access}`)
        }
        return headers;
    }
})

const refreshQuery = fetchBaseQuery({

})

const baseQueryWithReAuth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401 || result?.error?.status === 403) {

        // Get refresh token from state
        const token = api.getState().auth.token
        console.log('sending refresh token');

        // send refresh token for a new access token
        const refreshResult = await baseQuery(
            {
                url: 'authentication/token/refresh/',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: { refresh: token?.refresh }
            }, api, extraOptions
        )

        if (refreshResult?.data) {

            const { user } = api.getState().auth

            // store the new token into credentials & localstorage
            api.dispatch(setCredentials({ token: refreshResult.data, user: user }))
            result = await baseQuery(args, api, extraOptions)
        }
        else {
            api.dispatch(logOut())
        }
    }
    // localStorage.setItem('authTokens', JSON.stringify(result.data))
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({})
})