import React from "react"
import { BsPostcard } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { NavButton } from "../UI/nav-button"
import { CgProfile } from "react-icons/cg"

export const NavBar: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5 ">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Посты
          </NavButton>
        </li>
        <li>
          <NavButton href="subs" icon={<FiUsers />}>
            Подписки
          </NavButton>
        </li>
        <li>
          <NavButton href="followers" icon={<FaUsers />}>
            Подписчики
          </NavButton>
        </li>
        <li>
          <NavButton href="profile" icon={<CgProfile />}>
            Мой профиль
          </NavButton>
        </li>
        <li className="bg-gradient-to-r from-cyan-200 to-blue-300 rounded-xl">
          <NavButton href="followers" icon={<FaUsers />}>
            Обсуждения
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
