import Modal from 'react-modal'

Modal.setAppElement('#root')

interface AuthModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

const BackShopping = ({ isOpen, onRequestClose }: AuthModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
            className="bg-white rounded-lg p-6 max-w-md mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" // Ensure the overlay covers the entire screen
        >
            <h2 className="text-2xl font-bold mb-4 mx-8">Your cart is empty.</h2>
            <p className="mb-4 mx-4">You need to add to cart something!</p>
            <div className="flex justify-between p-2">
                <button
                    onClick={() => onRequestClose()}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                    Close
                </button>
                <button
                    onClick={() => window.location.href = '/#menu'}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                    Back to shopping
                </button>
            </div>
        </Modal>
    )
}

export default BackShopping
