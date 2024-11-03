import { axiosPrivateInstance } from "../helpers/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";

const useAxiosPrivate = () => {
    const token = useSelector(selectToken);
    // const { token } = useAuth();
    const refresh = useRefreshToken();


    useEffect(() => {
        const requestIntercept = axiosPrivateInstance.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token?.access}`;
                }
                return config
            }, (error) => Promise.reject(error)
        );

        // Call failed because token expires. Comes here and get renewed. Then goes to the above function to retry the request.
        // Only going to try to renew call failed once in Line 33
        const responseIntercept = axiosPrivateInstance.interceptors.response.use(
            response => {
                // console.log(response);
                return response;
            },
            async (error) => {
                console.log(error);
                const prevRequest = error?.config;
                // status maybe 401?
                if ((error?.response?.status === 401 || error?.response?.status === 403) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivateInstance(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivateInstance.interceptors.response.eject(responseIntercept);
            axiosPrivateInstance.interceptors.request.eject(requestIntercept);
        }
    }, [token, refresh])

    return axiosPrivateInstance;
}

export default useAxiosPrivate;