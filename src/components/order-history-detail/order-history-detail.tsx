import orderDetailsApi from '@/services/order-details'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

// Define the Food interface
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

// Define the OrderDetail interface
interface OrderDetail {
    OrderDetailID: string
    OrderID: string
    FoodID: string
    Quantity: number
    Price: string
    IsDeleted: boolean
    Food: Food
}

const getOrderDetailsByOrderID = async (orderID: string) => {
    try {
        const response = await orderDetailsApi.getOrderDetailsByOrderID(orderID)
        if (response && response.data) {
            return response.data // Assuming response.data contains the array of order details
        }
    } catch (error) {
        console.error(error)
        return null // Return null in case of an error
    }
}

export default function OrderHistoryDetail() {
    const { id } = useParams<{ id: string }>()
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const details = await getOrderDetailsByOrderID(id || '')
            if (details) {
                setOrderDetails(details)
            }
            setLoading(false)
        }

        fetchOrderDetails()
    }, [id])

    if (loading) {
        return <div className="text-center">Loading...</div>
    }

    if (orderDetails.length === 0) {
        return <div className="text-center">No order details found.</div>
    }

    const handleGoBack = () => {
        window.history.back()
    }

    return (
        <div className="container mx-auto px-4 py-6 bg-green-50">
            <h2 className="text-2xl font-bold mb-6">Order Details</h2>
            <button
                onClick={handleGoBack}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out mb-4"
            >
                <FaArrowLeft className="mr-2" />
                Go Back
            </button>
            <ul className="space-y-6">
                {orderDetails.map((order) => (
                    <li key={order.OrderDetailID} className="bg-white rounded-lg shadow-md p-4 flex hover:shadow-lg transition-shadow duration-300">
                        <img
                            src={order.Food.Image}
                            alt={order.Food.Name}
                            className="w-24 h-24 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">{order.Food.Name}</h3>
                            <p className="text-gray-600">{order.Food.Description}</p>
                            <div className="flex justify-between mt-2">
                                <p><strong>Quantity:</strong> {order.Quantity}</p>
                                <p className="text-green-600 font-semibold"><strong>Price:</strong> ${order.Price}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
