import React from "react"

export const ErrorMessage = ({ error = "" }: { error: string }) => {
  return error && <p className="text-red-500 mt-2 mb-2 text-small">{error}</p>
}
