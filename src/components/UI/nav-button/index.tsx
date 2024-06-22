import React from "react"
import { Link } from "react-router-dom"
import { CustomButton } from "../custom-button/index"

type Props = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

export const NavButton: React.FC<Props> = ({ children, icon, href }) => {
  return (
    <CustomButton className="flex justify-start text-xl shadow-sm bg-white w-full" icon={icon}>
      <Link to={href}>
        {children}
      </Link>
    </CustomButton>
  )
}