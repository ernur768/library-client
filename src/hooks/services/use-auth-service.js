import {libraryApi} from '../../api'
import {useHttp} from "../use-http-hook";
import {useCallback} from "react";

export const useAuthService = () => {
    const {request, ...httpStates} = useHttp(libraryApi)

    const register = useCallback(async (email, password) => {
        const requestOptions = {
            method: "POST",
            url: `/auth/register`,
            data: {email, password},
        }
        return await request(requestOptions)
    }, []);

    const login = useCallback(async (email, password) => {
        const requestOptions = {
            method: "POST",
            url: `/auth/login`,
            data: {email, password},
        }
        const response = await request(requestOptions)

        if (response.status === 200) {
            localStorage.setItem('token', response.data.accessToken)
        }
        return response
    }, []);

    const logout = useCallback(async () => {
        const requestOptions = {
            method: "POST",
            url: `/auth/logout`,
        }
        localStorage.removeItem('token')
        return request(requestOptions)
    }, []);

    const checkAuth = useCallback(async () => {
        try {
            const requestOptions = {
                method: "GET",
                url: `/auth/refresh`
            }
            const response = await request(requestOptions)
            localStorage.setItem('token', response.data.accessToken)
            return response
        }
        catch (error) {
            console.log(error)
        }
    }, []);

    return {
        ...httpStates,
        register,
        login,
        logout,
        checkAuth,
    }
}