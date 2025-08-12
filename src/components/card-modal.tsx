import { RootState } from '@/store'
import { addToCart, removeFromCart, toggleModal, updateQuantity } from '@/store/slice/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '@/utils/formatters'
import { CustomModal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { FaShoppingCart, FaTrash, FaMinus, FaPlus } from 'react-icons/fa'

const CartModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const isModalOpen = useSelector((state: RootState) => state.cart.isModalOpen)

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

    const handleRemoveItem = (index: number) => {
        dispatch(removeFromCart(index))
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)
    }

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    const handleCloseModal = () => {
        dispatch(toggleModal())
    }

    const handleCheckout = () => {
        navigate('/check-out')
        dispatch(toggleModal())
    }

    return (
        <CustomModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl mx-auto p-0 max-h-[90vh] overflow-hidden"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <FaShoppingCart className="text-2xl" />
                        <h2 className="text-2xl font-bold">{t('cart.title')}</h2>
                    </div>
                    {cartItems.length > 0 && (
                        <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                            <span className="text-sm font-medium">
                                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
                {cartItems.length === 0 ? (
                    <div className="text-center py-16 px-6">
                        <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-500 mb-2">{t('cart.empty')}</p>
                        <p className="text-gray-400">Add some delicious items to get started!</p>
                    </div>
                ) : (
                    <div className="p-6 space-y-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
                                <div className="flex items-center space-x-4">
                                    {/* Item Image */}
                                    <img
                                        src={item.Image}
                                        alt={item.Name}
                                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                                    />
                                    
                                    {/* Item Info */}
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 text-lg mb-1">
                                            {item.Name}
                                        </h4>
                                        <p className="text-green-600 font-semibold text-lg">
                                            {formatCurrency(item.Price)} VND
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center space-x-2 bg-white rounded-lg border">
                                            <Button
                                                onClick={() => handleQuantityChange(index, false)}
                                                variant="secondary"
                                                size="sm"
                                                className="p-2 hover:bg-gray-100 border-0"
                                            >
                                                <FaMinus className="text-xs" />
                                            </Button>
                                            
                                            <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
                                                {item.quantity}
                                            </span>
                                            
                                            <Button
                                                onClick={() => handleQuantityChange(index, true)}
                                                variant="secondary"
                                                size="sm"
                                                className="p-2 hover:bg-gray-100 border-0"
                                            >
                                                <FaPlus className="text-xs" />
                                            </Button>
                                        </div>

                                        {/* Remove Button */}
                                        <Button
                                            onClick={() => handleRemoveItem(index)}
                                            variant="danger"
                                            size="sm"
                                            className="p-2"
                                        >
                                            <FaTrash className="text-xs" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="mt-3 text-right">
                                    <span className="text-sm text-gray-500">{t('cart.quantity')}: {item.quantity} × </span>
                                    <span className="font-bold text-gray-900">
                                        {formatCurrency(item.Price * item.quantity)} VND
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Footer */}
            {cartItems.length > 0 && (
                <div className="border-t bg-gray-50 p-6">
                    {/* Total */}
                    <div className="bg-white rounded-xl p-4 mb-4 border-2 border-green-200">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-900">{t('cart.total')}:</span>
                            <span className="text-2xl font-bold text-green-600">
                                {formatCurrency(getTotalPrice())} VND
                            </span>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            onClick={handleCloseModal}
                            variant="secondary"
                            className="flex-1 py-3 font-semibold"
                        >
                            {t('cart.continueShopping')}
                        </Button>
                        <Button
                            onClick={handleCheckout}
                            variant="primary"
                            className="flex-1 py-3 font-semibold bg-green-500 hover:bg-green-600"
                        >
                            {t('cart.checkout')}
                        </Button>
                    </div>
                </div>
            )}
        </CustomModal>
    )
}

export default CartModal