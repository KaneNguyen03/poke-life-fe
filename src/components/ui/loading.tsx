import { FaSpinner } from "react-icons/fa"

const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <FaSpinner className="text-6xl text-blue-500 animate-spin mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h1>
                <p className="text-gray-600">Please wait while we process your request.</p>
            </div>
        </div>
    )
}

export default Loading