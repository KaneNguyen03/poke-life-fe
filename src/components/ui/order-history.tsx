import numeral from "numeral"

interface OrderItemProps {
    OrderID: string
    CreatedAt: string
    OrderStatus: string
    TotalPrice: number
}

interface Order {
    OrderID: string
    CreatedAt: string
    OrderStatus: string
    TotalPrice: number
}

interface OrdersSectionProps {
    orders: Order[]
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

const viewOrderDetails = (OrderID: string) => {
    const url = `order-history/${OrderID}`
    window.location.href = url
}


const OrderItem: React.FC<OrderItemProps> = ({ OrderID, CreatedAt, OrderStatus, TotalPrice }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Order #{OrderID}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${OrderStatus === "Delivered" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                {OrderStatus}
            </span>
        </div>
        <p className="text-gray-600 mb-2">Date: {formatDate(CreatedAt)}</p>
        <p className="text-gray-600 mb-4">Total: {numeral(TotalPrice).format('0,0')} VND</p>
        <button className="text-green-600 hover:text-green-800 font-semibold" onClick={() => viewOrderDetails(OrderID)}>View Details</button>
    </div>
)

export const OrdersHistory: React.FC<OrdersSectionProps> = ({ orders }) => {

    return (
        <div className="container mx-auto px-4 ">
            <h2 className="text-3xl font-bold text-center mb-8">My Orders</h2>
            <div className="max-w-3xl mx-auto">
                {orders ? (orders?.map((order) => (
                    <OrderItem key={order.OrderID} {...order} />
                ))) : <div className="bg-white rounded-lg shadow-md p-6 mb-4">No orders found.</div>}
            </div>
        </div>
    )
}
