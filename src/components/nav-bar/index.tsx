import React from "react"
import { BsPostcard } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { NavButton } from "../UI/nav-button"
import { CgProfile } from "react-icons/cg"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/UserSlice"
import { MdOutlineManageSearch } from "react-icons/md"
import { BackButton } from "../UI/back-button"

export const NavBar: React.FC = () => {
  const currentUser = useSelector(selectCurrent)
  return (
    <nav>
      <ul className="flex flex-col gap-3 ">
        <li>
          <NavButton href="/" icon={<BsPostcard />} >
            Посты
          </NavButton>
        </li>
        <li className="">
          <NavButton href={`subs`} icon={<FiUsers />} >
            Подписки
          </NavButton>
        </li>
        <li>
          <NavButton href={`users/${currentUser?.id}`} icon={<CgProfile />}>
            Мой профиль
          </NavButton>
        </li>
        <li className="">
          <NavButton href="categories" icon={<FaUsers />}>
            Разделы
          </NavButton>
        </li>
        <li className="">
          <NavButton href="search" icon={<MdOutlineManageSearch />}>
            Обзор
          </NavButton>
        </li>
        <BackButton></BackButton>
      </ul>
    </nav>
  )
}
