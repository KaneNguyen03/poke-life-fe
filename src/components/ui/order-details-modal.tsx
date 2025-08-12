// components/ui/OrderDetailsModal.tsx
import ingredientApi from '@/services/ingredients'
import orderDetailsApi from '@/services/order-details'
import numeral from 'numeral'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

interface Food {
    FoodID: string
    Name: string
    Description: string
    Price: string
    Calories: number
    Image: string
    CreatedAt: string
    UpdatedAt: string
    IsDeleted: boolean
}

interface OrderDetail {
    OrderDetailID: string
    OrderID: string
    FoodID: string
    Quantity: number
    Price: string
    IsDeleted: boolean
    Food: Food
}

interface OrderDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    orderID: string | null
}

// New interface for ingredient
interface Ingredient {
    ingredientID: string
    name: string
    quantity: number
    calories: number
    price: number
    description: string
}

const getOrderDetailsByOrderID = async (orderID: string) => {
    try {
        const response = await orderDetailsApi.getOrderDetailsByOrderID(orderID)
        if (response && response.data) {
            return response.data
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

interface OrderDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    orderID: string | null
}

const IngredientsModal: React.FC<{ isOpen: boolean; onClose: () => void; ingredients: Ingredient[] }> = ({ isOpen, onClose, ingredients }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Ingredients</h2>
                <button onClick={onClose} className="inline-flex items-center px-2 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 mb-4">
                    <FaArrowLeft className="mr-2" />
                    Close
                </button>
                <ul className="space-y-3">
                    {ingredients.map(ingredient => (
                        <li key={ingredient.ingredientID} className="flex justify-between items-center p-3 bg-green-100 rounded-md shadow hover:bg-green-200 transition duration-200">
                            <div className="flex-1">
                                <span className="font-medium text-lg">{ingredient.name}</span>
                                <p className="text-gray-600 text-sm">{ingredient.description}</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-gray-700 font-semibold">{ingredient.quantity} pcs</span>
                                <span className="block text-green-600">{numeral(ingredient.price).format('0,0')} VND</span>
                                <span className="block text-gray-500 text-sm">Calories: {ingredient.calories}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, onClose, orderID }) => {
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedDishIngredients, setSelectedDishIngredients] = useState<Ingredient[]>([])
    const [isIngredientsModalOpen, setIsIngredientsModalOpen] = useState(false)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (orderID) {
                const details = await getOrderDetailsByOrderID(orderID)
                if (details) {
                    setOrderDetails(details)
                }
                setLoading(false)
            }
        }

        fetchOrderDetails()
    }, [orderID])

    const handleDishClick = async (order: OrderDetail) => {
        if (order.Food.Name === "Custom Dish") {
            const ingredients = await ingredientApi.getIngredientByFoodId(order.FoodID)
            setSelectedDishIngredients(ingredients || [])
            setIsIngredientsModalOpen(true)
        }
    }

    if (!isOpen) return null

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="text-center">Loading...</div>
                </div>
            </div>
        )
    }

    if (orderDetails.length === 0) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="text-center">No order details found.</div>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                    <button onClick={onClose} className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800 mb-4">
                        <FaArrowLeft className="mr-2" />
                        Go Back
                    </button>
                    <div className="max-h-96 overflow-y-auto">
                        <ul className="space-y-4">
                            {orderDetails.map((order) => (
                                <li key={order.OrderDetailID} className="bg-green-50 rounded-lg p-4 flex shadow-md" onClick={() => handleDishClick(order)}>
                                    <img src={order.Food.Image} alt={order.Food.Name} className="w-20 h-20 object-cover rounded-md mr-4" />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{order.Food.Name}</h3>
                                        <p className="text-gray-600">{order.Food.Description}</p>
                                        <div className="flex justify-between mt-2">
                                            <p><strong>Quantity:</strong> {order.Quantity}</p>
                                            <p className="text-green-600 font-semibold"><strong>Price:</strong> {numeral(order.Price).format('0,0')} VND</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <IngredientsModal
                isOpen={isIngredientsModalOpen}
                onClose={() => setIsIngredientsModalOpen(false)}
                ingredients={selectedDishIngredients}
            />
        </>
    )
}

export default OrderDetailsModal
