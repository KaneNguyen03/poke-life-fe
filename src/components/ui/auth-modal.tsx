import Modal from 'react-modal'

Modal.setAppElement('#root')

interface AuthModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

const AuthModal = ({ isOpen, onRequestClose }: AuthModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
            className="bg-white rounded-lg p-6 max-w-md mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" // Ensure the overlay covers the entire screen
        >
            <h2 className="text-2xl font-bold mb-4 mx-8">Sign In or Create an Account</h2>
            <p className="mb-4 mx-4">You need to sign in or create an account to place an order.</p>
            <div className="flex justify-between p-2">
                <button
                    onClick={() => window.location.href = '/login'}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                    Sign In
                </button>
                <button
                    onClick={() => alert('Redirect to create account page')}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                    Create Account
                </button>
            </div>
        </Modal>
    )
}

export default AuthModal
