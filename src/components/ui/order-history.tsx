interface OrderItemProps {
    id: number
    date: string
    status: string
    total: number
}

interface Order {
    id: number
    date: string
    status: string
    total: number
}

interface OrdersSectionProps {
    orders: Order[]
}

const OrderItem: React.FC<OrderItemProps> = ({ id, date, status, total }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Order #{id}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status === "Delivered" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                {status}
            </span>
        </div>
        <p className="text-gray-600 mb-2">Date: {date}</p>
        <p className="text-gray-600 mb-4">Total: ${total.toFixed(2)}</p>
        <button className="text-green-600 hover:text-green-800 font-semibold">View Details</button>
    </div>
)

export const OrdersHistory: React.FC<OrdersSectionProps> = ({ orders }) => {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">My Orders</h2>
            <div className="max-w-3xl mx-auto">
                {orders.map((order) => (
                    <OrderItem key={order.id} {...order} />
                ))}
            </div>
        </div>
    )
}
