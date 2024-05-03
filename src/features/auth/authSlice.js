import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

// initialize userToken from local storage
const userToken = localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null

const user = localStorage.getItem('authTokens')
    ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access).email : null

// console.log(jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access).email)

const initialState = {
    user: user,
    token: userToken
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(action.payload)
            const { token, user } = action.payload
            state.user = user
            state.token = token
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    },
})


export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;