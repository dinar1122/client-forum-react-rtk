import React from "react"
import { Link } from "react-router-dom"
import { CustomButton } from "../custom-button/index"

type Props = {
  children: React.ReactNode
  icon: JSX.Element
  href: string,
  className?: string
}

export const NavButton: React.FC<Props> = ({ children, icon, href, className = '' }) => {
  return (
    <CustomButton className={`flex justify-start text-xl border-2 border-solid border-gray-100  w-full ${className}`} icon={icon}>
      <Link to={href}>
        {children}
      </Link>
    </CustomButton>
  )
}