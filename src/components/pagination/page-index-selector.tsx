interface PaginationControlsProps {
    pageIndex: number
    totalPages: number
    onPageChange: (page: number) => void
}

const PageIndexSelector: React.FC<PaginationControlsProps> = ({ pageIndex, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`mx-1 px-4 py-2 rounded-md transition duration-200 ${pageIndex === i ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
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
        <div className="p-6 flex justify-center items-center">
            <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-400 transition duration-200 mx-1"
                onClick={() => onPageChange(pageIndex - 1)}
                disabled={pageIndex === 1}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-400 transition duration-200 mx-1"
                onClick={() => onPageChange(pageIndex + 1)}
                disabled={pageIndex >= totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default PageIndexSelector
