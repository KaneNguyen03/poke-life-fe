import { FaArrowLeft, FaLock } from "react-icons/fa"

export const Unauthorized = () => {
    const handleGoBack = () => {
        window.history.back()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                <div className="mb-6">
                    <FaLock className="text-6xl text-red-500 mx-auto" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Access Denied</h1>
                <p className="text-xl mb-6 text-gray-600">
                    You do not have permission to access this page.
                </p>
                <button
                    onClick={handleGoBack}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300"
                >
                    <FaArrowLeft className="mr-2" />
                    Go Back
                </button>
                <div className="mt-8 text-sm text-gray-500">
                    <p>Need help? Contact our support team:</p>
                    <a
                        href="mailto:support@example.com"
                        className="text-blue-500 hover:underline"
                    >
                        support@example.com
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized