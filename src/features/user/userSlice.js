import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosPrivateInstance from '../../helpers/axios';
import { jwtDecode } from "jwt-decode";

const initialState = {
    loading: false,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        token: []
    },
    error: null
}

export const fetchUser = createAsyncThunk(
    'customer/fetchCustomers',
    async (data) => {
        try {
            const { data } = axiosPrivateInstance.post('authentication/login/', {
                "email": data.email,
                "password": data.password,
            })
            localStorage.setItem('userToken', data)
            return data
        }
        catch (error) {
            if (!err?.response) {
                return ('No Server Response')
            } else if (err.response?.status === 400) {
                return ('Missing Username or Password')
            } else if (err.response?.status === 401) {
                return ('Unauthorized access')
            } else {
                return ('Login Failed')
            }
        }
        console.log("asdasd")
        return axiosPrivateInstance.post('authentication/login/', {
            "email": data.email,
            "password": data.password,
        }).then((response) => response.data)
    })

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user.firstName = jwtDecode(action.payload.access).first_name;
            state.user.lastName = jwtDecode(action.payload.access).last_name;
            state.user.email = jwtDecode(action.payload.access).email;
            state.user.token = action.payload;
            state.error = '';
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false
            state.user = {};
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer