import React from 'react'

const BlockList = ({textContent}:any) => {
    return (
        <ol className=" marker:text-blue-600 list-disc ps-5 space-y-2 text-lg text-gray-600 dark:text-neutral-400">
            <li>{textContent}</li>
        </ol>

    )
}

export default BlockList