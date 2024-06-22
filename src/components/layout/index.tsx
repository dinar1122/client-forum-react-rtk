import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import { Header } from '../header'
import Container from '../container'
import { NavBar } from '../nav-bar'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectUser } from '../../features/UserSlice'
import Profile from '../profile'
import { NavButton } from '../UI/nav-button'
import { IoMdNotificationsOutline } from 'react-icons/io'

const Layout = () => {

    const isAuthenticated = useSelector(selectIsAuthenticated)
    const user = useSelector(selectUser)
    const navigate = useNavigate()



    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth")
        }
    }, [])

    return (
        <div className="bg-gradient-to-tr from-white to-indigo-50">
            <Header />
            <Container >
                <div className="flex-2 p-4">
                    <NavBar />
                </div>
                <div className="flex-1 p-4 max-w-[806px]">
                    <Outlet />
                </div>
                <div className="flex-col p-4 gap-2">
                    <div className="flex-col flex gap-5">
                        {!user && <Profile />}
                        <NavButton href="notifications" icon={<IoMdNotificationsOutline />}>
                        Уведомления
                    </NavButton>
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default Layout