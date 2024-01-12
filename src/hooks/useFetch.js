import { useEffect, useState } from 'react';
import axiosInstance from '../helpers/axios';

export default function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        axiosInstance
            .get(url)
            .then((response) => {
                setData(response.data)
                setSuccess(true)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [url]);
    return { data, loading, success, error };
}