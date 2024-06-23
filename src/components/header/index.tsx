import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,

} from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"
import { CiLogout } from "react-icons/ci"
import { Link, useNavigate } from "react-router-dom"
import { logout, selectIsAuthenticated } from "../../features/UserSlice"
import { CustomButton } from "../UI/custom-button"
import { useGetCategoryListQuery } from "../../app/services/categoryApi"

export const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useGetCategoryListQuery();


  const hadleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate("/auth")
  }

  return (
    <Navbar className="bg-gradient-to-r from-cyan-200 to-blue-300">
      <NavbarBrand>
        <Link to={`/`}><p className="font-bold text-inherit text-xl bg-gradient-to-r from-gray-100 to-gray-200 p-2 rounded-xl">Tech/Logic</p></Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
           
            <CustomButton
            color="default"
            type="button"
            className="font-semibold text-lg text-gray-700 bg-blue-100 flex ml-3 rounded-xl "
          >
            <Link to={`/create`}>написать</Link>
            
          </CustomButton>
          
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
