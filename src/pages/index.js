import {Route, Routes} from 'react-router-dom'
import Navbar from "../components/navbar";
import Register from "./register";
import Login from "./login";
import CatalogPage from "./catalog";
import UserPage from "./user";
import HomePage from "./home";
import BookPage from "./book";
import {useEffect, useState} from "react";
import {useAuthService} from "../hooks";
import AdminPage from "./admin";

export const Routing = () => (
    <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<MainPage />} />
    </Routes>
)

const MainPage = () => {
    const [user, setUser] = useState(null)
    const {checkAuth} = useAuthService()

    useEffect(() => {
        checkAuth()
            .then(res => {
                if (res && res.data && res.data.user) {
                    setUser(res.data.user)
                }
            })
    }, []);
    return (
        <>
            <Navbar />
            <Routes>
                <Route path={''} element={<HomePage />} />
                <Route path={'catalog'} element={<CatalogPage />} />
                <Route path={'me'} element={<UserPage user={user} />} />
                <Route path={'book/:id'} element={<BookPage user={user} />} />
                <Route path={'admin-page'} element={<AdminPage />} />
            </Routes>
        </>
    )
}