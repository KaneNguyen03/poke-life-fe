interface PageSizeSelectorProps {
    pageSize: number
    onPageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    keyword: string
    onKeywordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ pageSize, onPageSizeChange, keyword, onKeywordChange }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <span>View by: </span>
                <select
                    title="Page Size"
                    value={pageSize}
                    onChange={onPageSizeChange}
                    className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={keyword}
                    onChange={onKeywordChange}
                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md"
                />
            </div>
        </div>
    )
}

export default PageSizeSelector
