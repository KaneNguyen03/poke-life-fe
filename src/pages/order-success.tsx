import { useLocation } from 'react-router-dom'
import { FaCheckCircle } from "react-icons/fa"
import { IoMdArrowBack } from "react-icons/io"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react'

const OrderSuccess = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)

    const customerName = query.get("customerName")
    const phoneNumber = query.get("phoneNumber")
    const address = query.get("address")
    const paymentMethod = query.get("paymentMethod")
    const itemsParam = query.get("items")
    let items = []
    try {
        items = JSON.parse(itemsParam || "[]")
    } catch (error) {
        console.error("Error parsing items:", error)
    }
    const total = query.get("total")

    const orderDetails = {
        items,
        paymentMethod: paymentMethod ?? 'Cash on Delivery (COD)',
        total: parseFloat(total ?? '0'),
        deliveryAddress: address,
        phoneNumber
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-center mb-8">
                        <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
                    </div>
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Order Successful!</h1>
                    <p className="text-lg text-center text-gray-600 mb-8">Thank you for your purchase, {customerName}. We're processing your order now.</p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-gray-600"><span className="font-medium">Total Amount:</span> ${orderDetails.total.toFixed(2)}</p>
                            <p className="text-gray-600 col-span-2"><span className="font-medium">Delivery Address:</span> {orderDetails.deliveryAddress}</p>
                            <p className="text-gray-600 col-span-2"><span className="font-medium">Phone number:</span> {orderDetails.phoneNumber}</p>
                            <p className="text-gray-600"><span className="font-medium">Payment Method:</span> {orderDetails.paymentMethod}</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">Items Purchased:</h3>
                            <ul className="list-disc list-inside">
                                {orderDetails.items.map((item: { Name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; quantity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; Price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }, index: Key | null | undefined) => (
                                    <li key={index} className="text-gray-600">
                                        {item.Name} - Qty: {item.quantity} - ${item.Price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-gray-700 italic">"We appreciate your business and hope you enjoy your purchase!"</p>
                    </div>
                    <div className="text-center">
                        <button
                            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() => window.location.replace("/")}
                        >
                            <IoMdArrowBack className="mr-2" />
                            Return
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess
