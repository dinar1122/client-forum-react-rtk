import React from 'react'

const BlockCode = ({ textContent }: any) => {
    return (
        <div className="relative max-w-2xl mx-auto mt-2">
            <div className="bg-gray-700 text-white p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Code:</span>
                    <button className="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md" data-clipboard-target="#code">
                        Copy
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <pre id="code" className="text-gray-300">
                        <code>
                        {textContent}

                        </code>

                    </pre>
                </div>
            </div>
        </div>


    )
}

export default BlockCode