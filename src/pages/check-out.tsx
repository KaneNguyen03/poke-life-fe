import { RootState } from '@/store'
import { useState } from "react"
import { FaArrowLeft, FaMoneyBillWave, FaQrcode } from "react-icons/fa"
import { useSelector } from "react-redux"

const Checkout = () => {
    const [selectedPayment, setSelectedPayment] = useState("cod")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phoneNumber: ""
    })

    // Accessing cart items from Redux store
    const cartItems = useSelector((state: RootState) => state.cart.items)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Order submitted:", formData)
        alert("Order placed successfully!")
    }

    return (
        <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center text-green-600 hover:text-green-800"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Cart
                    </button>
                </div>
                <h1 className="text-3xl font-extrabold text-green-800 mb-8">Checkout</h1>
                {/* Display cart items */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                    {cartItems.length > 0 ? (
                        <ul className="space-y-4">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{item.Name} x{item.quantity}</span>
                                    <span className="text-gray-600">{item.Price} USD</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    id="cod"
                                    name="paymentMethod"
                                    type="radio"
                                    checked={selectedPayment === "cod"}
                                    onChange={() => setSelectedPayment("cod")}
                                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                                />
                                <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                                    <span className="flex items-center">
                                        <FaMoneyBillWave className="mr-2" />
                                        Cash on Delivery
                                    </span>
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="qrcode"
                                    name="paymentMethod"
                                    type="radio"
                                    checked={selectedPayment === "qrcode"}
                                    onChange={() => setSelectedPayment("qrcode")}
                                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                                />
                                <label htmlFor="qrcode" className="ml-3 block text-sm font-medium text-gray-700">
                                    <span className="flex items-center">
                                        <FaQrcode className="mr-2" />
                                        QR Code
                                    </span>
                                </label>
                            </div>
                        </div>

                        {selectedPayment === "qrcode" && (
                            <div className="mt-6">
                                <img src="https://example.com/qrcode.png" alt="QR Code" className="w-48 h-48 mx-auto" />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Checkout
