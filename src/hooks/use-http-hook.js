import axios from "axios";
import {useCallback, useState} from "react";

export const useHttp = (api=axios.create({})) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (options) => {
        setLoading(true)
        try {
            return await api.request(options)
        }
        catch (error) {
            setError(error.response.data.message)
            return error.response
        }
        finally {
            setLoading(false)
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null)
    }, []);

    return {
        loading,
        error,
        request,
        clearError,
    }
}