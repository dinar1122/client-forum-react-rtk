import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Input,
  } from "@nextui-org/react"
  import { LuSunMedium } from "react-icons/lu"
  import { FaRegMoon } from "react-icons/fa"
  import { useDispatch, useSelector } from "react-redux"
  import { CiLogout } from "react-icons/ci"
  import { useNavigate } from "react-router-dom"
  import { useContext } from "react"
import { logout, selectIsAuthenticated } from "../../features/UserSlice"
import { CustomButton } from "../UI/custom-button"
  
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
          <p className="font-bold text-inherit">TechLogic</p>
        </NavbarBrand>
  
        <NavbarContent justify="end">
          <NavbarItem>
          <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          
          type="search"
        />
          </NavbarItem>
          <NavbarItem>
            {isAuthenticated && (
              <CustomButton
              color="default"
              className="flex bg-blue-100"
                onClick={hadleLogout}
              >
                <CiLogout /> <span>Выйти</span>
              </CustomButton>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    )
  }
  