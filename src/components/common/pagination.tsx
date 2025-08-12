import React from 'react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className = ''
}) => {
    const renderPageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`mx-1 px-4 py-2 rounded-md transition duration-200 ${
                        currentPage === i 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </button>
            )
        }
        return pageNumbers
    }

    return (
        <div className={`p-6 flex justify-center items-center ${className}`}>
            <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-400 transition duration-200 mx-1"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-400 transition duration-200 mx-1"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    )
}
