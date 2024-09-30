import PageIndexSelector from '@/components/pagination/page-index-selector'
import PageSizeSelector from '@/components/pagination/page-size-selector'
import OrderDetailsModal from '@/components/ui/order-details-modal'
import StatusModal from '@/components/ui/status-modal'
import { AppDispatch, RootState } from '@/store'
import { fetchAllOrders, updateOrder } from '@/store/thunk/order-thunk'
import { Order } from '@/types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import moment from 'moment'
import numeral from 'numeral'

export const OrderManagement = () => {
    const dispatch: AppDispatch = useDispatch()

    const { orders, loading, error, message } = useSelector((state: RootState) => state.order)
    const { pagination } = useSelector((state: RootState) => state.order)

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
        if (message) {
            toast.success(message)
        }
    }, [error, message])

    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [keyword, setKeyword] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false) // New state for details modal
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [newStatus, setNewStatus] = useState('')

    const fetchOrders = () => {
        dispatch(fetchAllOrders({ pageIndex, pageSize, keyword }))
    }

    useEffect(() => {
        fetchOrders()
    }, [dispatch, pageIndex, pageSize, keyword])

    const handlePageChange = (page: number) => {
        setPageIndex(page)
    }

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(event.target.value))
        setPageIndex(1)
    }

    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
        setPageIndex(1)
    }

    const openModal = (order: Order) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    const openDetailsModal = (order: Order) => {
        setSelectedOrder(order)
        setIsDetailsModalOpen(true) // Open the details modal
    }

    const handleStatusChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedOrder) {
            const request = {
                orderStatus: newStatus,
                customerName: selectedOrder.CustomerName,
                phoneNumber: selectedOrder.PhoneNumber,
                address: selectedOrder.Address,
                paymentMethod: selectedOrder.paymentMethod,
                total: selectedOrder.TotalPrice,
                phone: selectedOrder.PhoneNumber,
            }
            dispatch(updateOrder({ id: selectedOrder.OrderID, updatedData: request }))
            setIsModalOpen(false)
            fetchOrders()
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Management</h2>
            <PageSizeSelector
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                keyword={keyword}
                onKeywordChange={handleKeywordChange}
            />
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4">Loading...</td>
                            </tr>
                        ) : (
                            Array.isArray(orders) && orders.map((order) => (
                                <tr key={order.OrderID}>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.OrderID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.CustomerName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.Address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.PhoneNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{moment(order.CreatedAt).format('DD-MM-YYYY')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.paymentMethod}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.OrderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.OrderStatus === 'Finished' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {order.OrderStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{numeral(order.TotalPrice).format('0,0')} VND</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                                            onClick={() => openDetailsModal(order)} // Open details modal
                                        >
                                            View
                                        </button>
                                        <button
                                            className={`text-green-600 hover:text-green-900 ${order.OrderStatus === 'Finished' || order.OrderStatus === 'Cancelled' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => openModal(order)}
                                            disabled={order.OrderStatus === 'Finished' || order.OrderStatus === 'Cancelled'}
                                        >
                                            Process
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <PageIndexSelector
                    pageIndex={pageIndex}
                    totalPages={pagination?.totalPages} // Safely access totalPages
                    onPageChange={handlePageChange}
                />
            </div>

            {isModalOpen && (
                <StatusModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    order={selectedOrder}
                    newStatus={newStatus}
                    setNewStatus={setNewStatus}
                    onStatusChange={handleStatusChange}
                />
            )}

            {isDetailsModalOpen && (
                <OrderDetailsModal
                    isOpen={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                    orderID={selectedOrder?.OrderID || ""} // Pass selected order ID
                />
            )}
        </div>
    )
}
