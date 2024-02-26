import {useHttp} from "../use-http-hook";
import {libraryApi} from '../../api'
import {useCallback} from "react";

export const useUserService = () => {
    const {request, ...httpStates} = useHttp(libraryApi)

    const getUserInfo = useCallback(() => {
        const requestOptions = {
            method: 'GET',
            url: `/user`
        }
        return request(requestOptions)
    }, []);

    const addBook = useCallback((book) => {
        const requestOptions = {
            method: 'POST',
            url: '/user/books',
            data: {book},
        }

        return request(requestOptions)
    }, []);

    const removeBook = useCallback((id) => {
        const requestOptions = {
            method: 'DELETE',
            url: `/user/books/${id}`
        }
        return request(requestOptions)
    }, []);

    const addList = useCallback((list) => {
        const requestOptions = {
            method: 'POST',
            url: '/user/lists',
            data: {list}
        }
        return request(requestOptions)
    }, []);

    return {
        ...httpStates,
        getUserInfo,
        addBook,
        removeBook,
        addList
    }
}