import { useEffect, useState } from 'react'
import orderApi from '@/services/order'

export const useOrders = (customerId?: string) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchOrders = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = customerId 
                ? await orderApi.getAllOrderByCustomerID()
                : await orderApi.getAllOrder()
            setOrders(data || [])
        } catch (err) {
            setError('Failed to fetch orders')
            console.error('Error fetching orders:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [customerId]) // eslint-disable-line react-hooks/exhaustive-deps

    return {
        orders,
        loading,
        error,
        refetch: fetchOrders
    }
}
