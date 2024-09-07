import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import { useSnackbar } from 'notistack';
import useAuth from './useAuth';

const useAxiosFunction = () => {
    const { logoutUser } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();


    const axiosFetch = async (configObj) => {
        const { url, method, data = {}, formSetError = {} } = configObj;
        try {
            setLoading(true);
            const res = await axiosPrivate[method.toLowerCase()](url, data)
            // console.log(res);
            setSuccess(() => true);
            setResponse(res.data);
            if (method == 'post' || method == 'put' || method == 'delete' || method == 'patch') {
                if (res.data.message) {
                    enqueueSnackbar(res.data.message, { variant: 'success' });
                }
            }
            setError(false);
        }
        catch (err) {
            console.log(err)
            setError(true);
            if (err?.response?.status === 401) {
                if (err?.response?.data?.code === "token_not_valid") {
                    logoutUser();
                }
                enqueueSnackbar(err?.response?.data?.detail, { variant: 'error', autoHideDuration: 5000 });
            }
            // Goes here if permission denied
            if (err?.response?.status === 403) {
                enqueueSnackbar(err?.response?.data?.detail, { variant: 'error', autoHideDuration: 5000 });
            }
            // Goes here if deletion has raise an error
            if (err?.response?.status === 404) {
                enqueueSnackbar(err?.response?.data?.message, { variant: 'error', autoHideDuration: 8000 });
            }
            // Goes here if item already exists status==500
            if (err?.response?.status === 500) {
                const errMesssage = err?.response?.data['message'] || "Something went wrong. Please refresh page";
                formSetError(err?.response?.data?.label, { type: "manual", message: errMesssage })
                enqueueSnackbar(errMesssage, { variant: 'error', autoHideDuration: 5000 });
            }
        }
        finally {
            setLoading(false);
        }
    }

    return { axiosFetch, response, setResponse, loading, setLoading, success, setSuccess, error, setError }
}

export default useAxiosFunction;