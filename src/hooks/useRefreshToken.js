import axiosInstance from "../helpers/axios";
import useAuth from "./useAuth";
import { jwtDecode } from "jwt-decode";


export default function useRefreshToken() {
    const { token, setToken, setUser } = useAuth();

    // Refresh token. Attach this to axios interceptors
    const refresh = async () => {
        const response = await axiosInstance.post('authentication/token/refresh/', {
            "refresh": token?.refresh
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // localStorage.setItem('authTokens', JSON.stringify(response.data))
        // setToken(prev => {
        //     return response.data
        // });
        // setUser(prev => {
        //     return jwtDecode(response.data.access)
        // });
        setToken(response.data)
        setUser(jwtDecode(response.data.access))
        localStorage.setItem('authTokens', JSON.stringify(response.data))
        return response.data.access;
    }

    return refresh;
}
