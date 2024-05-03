import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

export default function useFetch(url) {
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            await axiosPrivate
                .get(url)
                .then((response) => {
                    setData(response.data)
                    setSuccess(true)
                })
                .catch((err) => {
                    console.log(err)
                    setError(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        getData();

    }, []);
    return { data, setData, loading, success, error };
}