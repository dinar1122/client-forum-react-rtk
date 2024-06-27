import React from 'react'

const BlockCode = ({ textContent }: any) => {
    return (
        <div className="relative max-w-2xl mx-auto mt-2">
            <div className="bg-white text-black p-4 border border-gray-300 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500">Code:</span>
                    <button className="code bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md" data-clipboard-target="#code">
                        Копировать
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <pre id="code" className="text-gray-800 bg-gray-200 p-2 rounded-lg">
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
