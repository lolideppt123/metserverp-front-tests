import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decoded = jwtDecode(token.access);
        return decoded.exp * 1000 > Date.now();
    } catch (error) {
        console.error('Token decoding failed:', error);
        return false; // Return false if decoding fails
    }
};

// Initialize userToken from local storage
const storedToken = localStorage.getItem('authTokens');
const userToken = storedToken ? JSON.parse(storedToken) : null;


const user = userToken && isTokenValid(userToken)
    ? jwtDecode(userToken.access).email
    : null;

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
            const { token, user } = action.payload
            state.user = user;
            state.token = token;
            localStorage.setItem('authTokens', JSON.stringify(token)); // Store token in local storage
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('authTokens'); // Clear from local storage

        }
    },
})


export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;