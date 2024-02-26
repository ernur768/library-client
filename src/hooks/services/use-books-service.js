import {libraryApi} from '../../api'
import {useHttp} from "../use-http-hook";
import {useCallback} from "react";

export const useBooksService = () => {
    const {request, ...httpStates} = useHttp(libraryApi)

    const getBooksByPublisher = useCallback((publisher, offset=0) => {
        const requestOptions = {
            method: 'GET',
            url: `/books/publisher/${publisher}?offset=${offset}`
        }
        return request(requestOptions)
    }, []);

    const getBooksByAuthor = useCallback((author, offset=0) => {
        const requestOptions = {
            method: 'GET',
            url: `/books/author/${author}?offset=${offset}`
        }
        return request(requestOptions)
    }, []);

    const getBooksByCategory = useCallback((category, offset=0) => {
        const requestOptions = {
            method: 'GET',
            url: `/books/category/${category}?offset=${offset}`
        }
        return request(requestOptions)
    }, []);

    const getBooksByTitle = useCallback((title, offset=0) => {
        const requestOptions = {
            method: 'GET',
            url: `/books/title/${title}?offset=${offset}`
        }
        return request(requestOptions)
    }, []);

    const getBookById = useCallback(async (id) => {
        const requestOptions = {
            method: 'GET',
            url: `/books/id/${id}`,
        }
        return request(requestOptions)
    }, []);

    const getMainPageBooks = useCallback(() => {
        const requestOptions = {
            method: 'GET',
            url: `/books/main-page`
        }
        return request(requestOptions)
    }, []);

    const addMainPageBook = useCallback((id) => {
        const requestOptions = {
            method: 'POST',
            url: `/books/main-page`,
            data: {id}
        }
        return request(requestOptions)
    }, []);

    const deleteMainPageBook = useCallback((id) => {
        const requestOptions = {
            method: 'DELETE',
            url: `/books/main-page/${id}`
        }
        return request(requestOptions)
    }, []);

    return {
        ...httpStates,
        getBooksByPublisher,
        getBooksByAuthor,
        getBooksByCategory,
        getBooksByTitle,
        getBookById,
        getMainPageBooks,
        addMainPageBook,
        deleteMainPageBook,
    }
}