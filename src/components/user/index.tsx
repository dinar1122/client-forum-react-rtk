import React from "react"
import { User as NextUiUser } from "@nextui-org/react"
import { BASE_URL } from "../../constants"

type Props = {
  username: string
  avatarUrl: string
  description?: string
  className?: string
}

export const User: React.FC<Props> = ({
  username = "",
  description = "",
  avatarUrl = "",
  className = "",
}) => {
  return (
    <NextUiUser
      name={username}
      className={className}
      description={description}
      avatarProps={{
        src: `${BASE_URL}${avatarUrl}`,
      }}
    />
  )
}
