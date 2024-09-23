import { RootState } from '@/store'
import { addToCart, removeFromCart, toggleModal, updateQuantity } from '@/store/slice/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CartModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const isModalOpen = useSelector((state: RootState) => state.cart.isModalOpen)

    if (!isModalOpen) return null

    const handleQuantityChange = (index: number, increment: boolean) => {
        if (increment) {
            dispatch(addToCart(cartItems[index]))
        } else {
            // Decrease quantity
            if (cartItems[index].quantity > 1) {
                dispatch(updateQuantity({ index, quantity: cartItems[index].quantity - 1 }))
            } else {
                dispatch(removeFromCart(index))
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 relative">
                <button
                    onClick={() => dispatch(toggleModal())}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-6 text-center">Your Cart</h2>
                {cartItems.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map((item, index) => (
                            <li key={index} className="flex justify-between items-center py-4">
                                <div className="flex items-center">
                                    <img src={item.Image} alt={item.Name} className="w-12 h-12 rounded-full mr-4" />
                                    <div>
                                        <p className="text-md font-medium">{item.Name}</p>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleQuantityChange(index, false)}
                                        className="text-gray-600 hover:text-gray-800 px-2"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2 text-lg">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(index, true)}
                                        className="text-gray-600 hover:text-gray-800 px-2"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => dispatch(removeFromCart(index))}
                                        className="text-red-500 hover:text-red-700 ml-4"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={() => dispatch(toggleModal())}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            navigate('/check-out')
                            dispatch(toggleModal())
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartModal