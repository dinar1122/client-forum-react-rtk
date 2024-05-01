import React from 'react'

type containerProps = {
    children: React.ReactElement[] | React.ReactElement
}

export const Container = ({children} : containerProps) => {
  return (
    <div className='flex max-w-screen-xl mx-auto mt-10'>
      {children}
    </div>
  )
}

export default Container
