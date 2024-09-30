import AuthModal from '@/components/ui/auth-modal'
import BackShopping from '@/components/ui/back-shopping'
import Loading from '@/components/ui/loading'
import { useAuth } from '@/hooks/use-auth'
import foodApi from '@/services/food'
import orderApi from '@/services/order'
import { RootState } from '@/store'
import { useEffect, useState } from "react"
import { FaArrowLeft, FaMoneyBillWave, FaQrcode } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import QRCODE from '@/assets/qrcode.jpg'
import numeral from 'numeral'

const Checkout = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [selectedPayment, setSelectedPayment] = useState("cod")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        customerName: "",
        address: "",
        phoneNumber: "",
        paymentMethod: "COD"
    })
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalBackOpen, setIsModalBackOpen] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (user == null) {
            setIsModalOpen(true)
            return
        }

        if (cartItems.length === 0) {
            setIsModalBackOpen(true)
            return
        }

        const newArrayItems = cartItems.filter(x => x.Name !== "Custom Dish").map((item) => ({
            foodID: item.FoodID,
            quantity: item?.quantity || 0,
        }))

        // Set loading to true
        setLoading(true)

        // Wait for all API calls to finish
        const resultSubmitNewFood = await Promise.all(cartItems.map(async (item) => {
            if (item?.Ingredients?.length ?? 0 > 0) {
                const newIngredientsList = item?.Ingredients?.map((ingredient) => ({
                    ingredientID: ingredient.IngredientID,
                    quantity: ingredient.Quantity
                })) ?? []
                const requestNewFood = {
                    ingredientList: newIngredientsList,
                    name: item.Name,
                    description: item.Note || "",
                    image: item.Image,
                }

                try {
                    const result = await foodApi.createCustomFood(requestNewFood)
                    return result // Assuming `result` contains the FoodID
                } catch (error) {
                    console.error("Error updating food:", error)
                    return null // or handle error as needed
                }
            }
            return null // return null if no ingredients
        }))
        // Filter out null results to ensure only successful API calls are processed
        const validResults = resultSubmitNewFood.filter(result => result !== null)

        // Create a new array that combines newArrayItems and validResults
        const newFoodItems = validResults.map(result => ({
            foodID: result!.FoodID, // assuming the result has a FoodID property
            quantity: 1, // or any other quantity logic you want
        }))
        // Combine the existing newArrayItems with newFoodItems
        const combinedArrayItems = [...newArrayItems, ...newFoodItems]
        console.log("🚀 Kha ne ~ combinedArrayItems:", combinedArrayItems)


        const dataSubmit = {
            ...formData,
            orderDetails: combinedArrayItems,
        }

        //Call API to create order
        orderApi.createOrder(dataSubmit)
            .then(() => {
                toast.success("Order created successfully!")
                navigate(`/order-success?customerName=${formData.customerName}&phoneNumber=${formData.phoneNumber}&address=${formData.address}&paymentMethod=${formData.paymentMethod}&items=${encodeURIComponent(JSON.stringify(cartItems))}&total=${calculateTotalPrice()}`)
            })
            .catch((error) => {
                toast.error("Failed to create order. Please try again.")
                console.error("Order creation error:", error)
            })
            .finally(() => {
                // Set loading to false
                setLoading(false)
            })
    }

    useEffect(() => {
        if (user) {
            setFormData({
                customerName: user.Username || "",
                address: user.Address || "",
                phoneNumber: user.PhoneNumber || "",
                paymentMethod: "COD"
            })
        }
    }, [user])

    return (
        <div>
            {loading ?
                (<Loading />) : (
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
                            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                                {cartItems.length > 0 ? (
                                    <div>
                                        <ul className="space-y-4">
                                            {cartItems.map((item, index) => (
                                                <li key={index} className="mb-4 border-b border-gray-200 pb-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium text-lg">{item.Name} x{item.quantity}</span>
                                                        <span className="text-gray-600">{numeral(item.Price).format('0,0')} VND</span>
                                                    </div>
                                                    {item.Ingredients && item.Ingredients.length > 0 && (
                                                        <ul className="ml-4 mt-2">
                                                            {item.Ingredients.map((ingredient, ingIndex) => (
                                                                <li key={ingIndex} className="flex justify-between text-sm text-gray-700">
                                                                    <span>{ingredient.Name} x{ingredient.Quantity}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-4 flex justify-between font-semibold text-lg">
                                            <span>Total:</span>
                                            <span>{numeral(calculateTotalPrice()).format('0,0')} VND</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Your cart is empty.</p>
                                )}
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="bg-white shadow-md rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="customerName"
                                                name="customerName"
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                                value={formData.customerName}
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
                                                onChange={() => {
                                                    setSelectedPayment("cod")
                                                    setFormData({ ...formData, paymentMethod: "COD" })
                                                }}
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
                                                onChange={() => {
                                                    setSelectedPayment("qrcode")
                                                    setFormData({ ...formData, paymentMethod: "QRCODE" })
                                                }}
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
                                            <img src={QRCODE} alt="QR Code" className="h-72 mx-auto" />
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

                        <AuthModal
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                        />

                        <BackShopping
                            isOpen={isModalBackOpen}
                            onRequestClose={() => setIsModalBackOpen(false)}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default Checkout
