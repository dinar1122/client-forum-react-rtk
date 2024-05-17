import React from "react"

type Props = {
  children: string
  size?: string
}

export const TextContent: React.FC<Props> = ({ children, size = "text-xl" }) => {
  return <p className={`${size} mt-3`}>{children}</p>
}
