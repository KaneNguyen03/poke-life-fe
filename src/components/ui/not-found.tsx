import { FaArrowLeft } from "react-icons/fa"

export const NotFound = () => {
    const handleGoBack = () => {
        window.history.back()
    }

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        alt="404 illustration"
                        className="w-full rounded-lg shadow-lg mb-8"
                    />
                </div>
                <div>
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                        <FaArrowLeft className="mr-2" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound