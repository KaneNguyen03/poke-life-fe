import Loading from "@/components/ui/loading"
import { OrdersHistory } from "@/components/ui/order-history"
import { useAuth } from "@/hooks/use-auth"
import orderApi from "@/services/order"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { FaSave } from "react-icons/fa"

export const Profile = () => {
    const { user } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState({ ...user })
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await orderApi.getAllOrderByCustomerID()
                setOrders(orders)
            } catch (error) {
                console.error("Error fetching orders:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditedUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // onUpdateProfile(editedUser)
        setIsEditing(false)
    }

    return (
        <div className="flex flex-col lg:flex-row w-full px-40 bg-green-50">
            {loading ? <Loading /> :
                (<> <div className="container mx-auto px-4 py-8 lg:w-1/2">
                    <h2 className="text-3xl font-bold text-center mb-8">My Profile</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={editedUser.Username}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={editedUser.Email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
                                    >
                                        <FaSave className="mr-2" />
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <p className="mb-4"><strong>Name:</strong> {user?.Username}</p>
                                <p className="mb-4"><strong>Email:</strong> {user?.Email}</p>
                                <p className="mb-4"><strong>Addres:</strong> {user?.Address}</p>
                                <p className="mb-4"><strong>Phone:</strong> {user?.PhoneNumber}</p>
                                <div className="flex justify-end">
                                    {/* <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
                                    >
                                        <FaEdit className="mr-2" />
                                        Edit Profile
                                    </button> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                    <div className="container mx-auto px-4 py-8 lg:w-1/2">
                        <OrdersHistory orders={orders} />
                    </div></>)}
        </div>
    )
}
