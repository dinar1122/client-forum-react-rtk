import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Header } from '../header'
import Container from '../container'
import { NavBar } from '../nav-bar'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectUser } from '../../features/UserSlice'

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
        <>
            <Header />
            <Container>
                <div className="flex-2 p-4">
                    <NavBar />
                </div>
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
                <div className="flex-2 p-4">

                </div>
            </Container>
        </>
    )
}

export default Layout