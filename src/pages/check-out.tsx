import CheckoutAuthModal from '@/components/ui/checkout-auth-modal'
import Loading from '@/components/ui/loading'
import { useAuth } from '@/hooks/use-auth'
import orderApi from '@/services/order'
import { RootState } from '@/store'
import { updateQuantity, clearCart } from '@/store/slice/cart-slice'
import { useEffect, useState } from "react"
import { FaArrowLeft, FaMoneyBillWave, FaQrcode, FaShoppingCart, FaUser, FaMapMarkerAlt, FaPhone, FaCheck, FaLock, FaCreditCard, FaMobile, FaPlus, FaMinus } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import QRCODE from '@/assets/qrcode.jpg'

const Checkout = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [selectedPayment, setSelectedPayment] = useState("cod")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        customerName: user?.Username || "",
        address: "",
        phoneNumber: "",
        paymentMethod: "COD"
    })
    const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [showQR, setShowQR] = useState(false)

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                customerName: user.Username || ""
            }))
        }
    }, [user])

    const paymentMethods = [
        {
            id: 'cod',
            name: 'Cash on Delivery',
            description: 'Pay when your order arrives',
            icon: FaMoneyBillWave,
            color: 'text-green-600',
            bgColor: 'bg-green-50 border-green-200'
        },
        {
            id: 'bank_transfer',
            name: 'Bank Transfer',
            description: 'Transfer via QR code',
            icon: FaQrcode,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 border-blue-200'
        },
        {
            id: 'credit_card',
            name: 'Credit Card',
            description: 'Visa, Mastercard accepted',
            icon: FaCreditCard,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 border-purple-200'
        },
        {
            id: 'e_wallet',
            name: 'E-Wallet',
            description: 'Momo, ZaloPay, ViettelPay',
            icon: FaMobile,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 border-orange-200'
        }
    ]

    const validateForm = () => {
        const errors: {[key: string]: string} = {}
        
        if (!formData.customerName.trim()) {
            errors.customerName = 'Name is required'
        }
        
        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required'
        } else if (!/^\d{10,11}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
            errors.phoneNumber = 'Invalid phone number format'
        }
        
        if (!formData.address.trim()) {
            errors.address = 'Address is required'
        }
        
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' })
        }
    }

    const handleQuantityChange = (index: number, increment: boolean) => {
        if (increment) {
            dispatch(updateQuantity({ index, quantity: cartItems[index].quantity + 1 }))
        } else {
            if (cartItems[index].quantity > 1) {
                dispatch(updateQuantity({ index, quantity: cartItems[index].quantity - 1 }))
            }
        }
    }

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)
    }

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    const calculateDeliveryFee = () => {
        return calculateTotalPrice() > 200000 ? 0 : 25000
    }

    const calculateTax = () => {
        return Math.round(calculateTotalPrice() * 0.1)
    }

    const calculateFinalTotal = () => {
        return calculateTotalPrice() + calculateDeliveryFee() + calculateTax()
    }

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!validateForm()) {
            toast.error('Please fix form errors')
            return
        }
        
        if (cartItems.length === 0) {
            toast.error('Your cart is empty')
            navigate('/')
            return
        }

        if (!user) {
            setIsAuthModalOpen(true)
            return
        }

        if (selectedPayment === 'bank_transfer') {
            setShowQR(true)
            return
        }

        await processOrder()
    }

    const processOrder = async () => {
        const orderItems = cartItems.filter(x => x.Name !== "Custom Dish").map((item) => ({
            foodID: item.FoodID,
            quantity: item.quantity,
        }))

        setLoading(true)

        try {
            const orderData = {
                customerName: formData.customerName,
                address: formData.address,
                phoneNumber: formData.phoneNumber,
                paymentMethod: selectedPayment.toUpperCase(),
                orderDetails: orderItems,
                totalAmount: calculateFinalTotal()
            }

            const result = await orderApi.createOrder(orderData)
            
            if (result) {
                // Clear cart after successful order
                dispatch(clearCart())
                toast.success('Order placed successfully!')
                navigate('/order-success', {
                    state: {
                        orderData,
                        cartItems,
                        totalAmount: calculateFinalTotal()
                    }
                })
            }
        } catch (error) {
            console.error('Order submission error:', error)
            toast.error('Failed to place order. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleAuthSuccess = () => {
        setIsAuthModalOpen(false)
        // Form will be automatically re-submitted since user is now authenticated
        toast.success('Successfully signed in! Completing your order...')
        setTimeout(() => {
            processOrder()
        }, 1000)
    }




    if (loading) {
        return <Loading />
    }

    // QR Code Modal
    if (showQR) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Bank Transfer Payment
                        </h2>
                        <img 
                            src={QRCODE} 
                            alt="QR Code for payment" 
                            className="w-64 h-64 mx-auto mb-6 rounded-lg shadow-lg"
                        />
                        <p className="text-gray-600 mb-6">
                            Scan this QR code to complete your payment
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    setShowQR(false)
                                    handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>)
                                }}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors duration-300"
                            >
                                Confirm Payment
                            </button>
                            <button
                                onClick={() => setShowQR(false)}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-colors duration-300"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    >
                        <FaArrowLeft />
                        <span className="font-medium">Back</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <div className="w-20"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <FaShoppingCart className="mr-3 text-green-600" />
                                Order Summary
                            </h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                                        <img
                                            src={item.Image}
                                            alt={item.Name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-sm">{item.Name}</h4>
                                            <p className="text-green-600 font-semibold">
                                                {formatPrice(item.Price)}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => handleQuantityChange(index, false)}
                                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
                                                disabled={item.quantity <= 1}
                                                aria-label="Decrease quantity"
                                            >
                                                <FaMinus className="text-xs" />
                                            </button>
                                            <span className="font-semibold text-gray-900 w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(index, true)}
                                                className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition-colors duration-300"
                                                aria-label="Increase quantity"
                                            >
                                                <FaPlus className="text-xs" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Totals */}
                            <div className="border-t pt-6 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(calculateTotalPrice())}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span className={calculateDeliveryFee() === 0 ? 'text-green-600 font-semibold' : ''}>
                                        {calculateDeliveryFee() === 0 ? 'Free' : formatPrice(calculateDeliveryFee())}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>{formatPrice(calculateTax())}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-3">
                                    <span>Total</span>
                                    <span className="text-green-600">{formatPrice(calculateFinalTotal())}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="lg:col-span-2 order-1 lg:order-2">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Information */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <FaUser className="mr-3 text-green-600" />
                                    Contact Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="customerName"
                                            value={formData.customerName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-xl border ${
                                                formErrors.customerName 
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                    : 'border-gray-300 focus:border-green-500 focus:ring-green-200'
                                            } focus:ring-4 outline-none transition-all duration-300`}
                                            placeholder="Enter your full name"
                                        />
                                        {formErrors.customerName && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.customerName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                                    formErrors.phoneNumber 
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                        : 'border-gray-300 focus:border-green-500 focus:ring-green-200'
                                                } focus:ring-4 outline-none transition-all duration-300`}
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        {formErrors.phoneNumber && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <FaMapMarkerAlt className="mr-3 text-green-600" />
                                    Delivery Address
                                </h2>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Address *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className={`w-full px-4 py-3 rounded-xl border ${
                                            formErrors.address 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-gray-300 focus:border-green-500 focus:ring-green-200'
                                        } focus:ring-4 outline-none transition-all duration-300 resize-none`}
                                        placeholder="Enter your delivery address"
                                    />
                                    {formErrors.address && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                                    )}
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <FaLock className="mr-3 text-green-600" />
                                    Payment Method
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {paymentMethods.map((method) => {
                                        const IconComponent = method.icon
                                        return (
                                            <label
                                                key={method.id}
                                                className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
                                                    selectedPayment === method.id 
                                                        ? `${method.bgColor} border-current` 
                                                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value={method.id}
                                                    checked={selectedPayment === method.id}
                                                    onChange={(e) => setSelectedPayment(e.target.value)}
                                                    className="sr-only"
                                                />
                                                <div className="flex items-start space-x-3">
                                                    <IconComponent className={`text-xl mt-1 ${
                                                        selectedPayment === method.id ? method.color : 'text-gray-400'
                                                    }`} />
                                                    <div>
                                                        <h3 className={`font-semibold ${
                                                            selectedPayment === method.id ? method.color : 'text-gray-900'
                                                        }`}>
                                                            {method.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {method.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                {selectedPayment === method.id && (
                                                    <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${method.color.replace('text-', 'bg-')}`}>
                                                        <FaCheck className="text-white text-xs" />
                                                    </div>
                                                )}
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                                    disabled={loading || cartItems.length === 0}
                                >
                                    <FaCheck />
                                    <span>
                                        {loading ? 'Processing...' : `Place Order • ${formatPrice(calculateFinalTotal())}`}
                                    </span>
                                </button>
                                <p className="text-center text-sm text-gray-500 mt-4">
                                    🔒 Your payment information is secure
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Authentication Modal */}
            <CheckoutAuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={handleAuthSuccess}
                cartItemCount={getTotalItems()}
                cartTotal={formatPrice(calculateFinalTotal())}
            />
        </div>
    )
}

export default Checkout
