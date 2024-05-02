import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
  } from "@nextui-org/react"
  import { LuSunMedium } from "react-icons/lu"
  import { FaRegMoon } from "react-icons/fa"
  import { useDispatch, useSelector } from "react-redux"
  import { CiLogout } from "react-icons/ci"
  import { useNavigate } from "react-router-dom"
  import { useContext } from "react"
import { logout, selectIsAuthenticated } from "../../features/UserSlice"
  
  export const Header = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const hadleLogout = () => {
      dispatch(logout())
      localStorage.removeItem('token')
      navigate("/auth")
    }
  
    return (
      <Navbar className="bg-gradient-to-r from-cyan-200 to-blue-300">
        <NavbarBrand>
          <p className="font-bold text-inherit">Network Social</p>
        </NavbarBrand>
  
        <NavbarContent justify="end">
          <NavbarItem>
            {isAuthenticated && (
              <Button
                color="default"
                variant="flat"
                className="gap-2"
                onClick={hadleLogout}
              >
                <CiLogout /> <span>Выйти</span>
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    )
  }
  