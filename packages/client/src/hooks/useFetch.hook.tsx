import {useEffect, useState} from "react";
import axios from 'axios';

export interface UseFetchRes {
    error: string;
    loading: boolean;
    data: any;
}

export interface useFetchInput {
    url: string,
    options?: object,
    counter?: number
}

export const useFetch = ({url, options, counter}: useFetchInput): UseFetchRes => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(() => {
                return true
            });
            try {
                const result = await axios(url, options);
                setData(() => {
                    return result.data
                });
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(() => {
                    return false
                });
            }
        };
        fetchData();
    }, [url, options, counter]);

    return {error, loading, data};
};
