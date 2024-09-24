import orderApi from "@/services/order"
import { APICreateOrderRequest, APIUpdateOrderRequest, Order } from "@/types"
import { createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk for fetching all orders
export const fetchAllOrders = createAsyncThunk<Order[], { pageIndex?: number; pageSize?: number; keyword?: string }>(
    'orders/fetchAllOrders',
    async ({ pageIndex = 1, pageSize = 10, keyword = '' }) => {
        const response = await orderApi.getAllOrder(pageIndex, pageSize, keyword)
        return response.orders // Ensure response matches Order[] type
    }
)

// Async thunk for creating an order
export const createOrder = createAsyncThunk<Order, APICreateOrderRequest>(
    'orders/createOrder',
    async (data) => {
        const response = await orderApi.createOrder(data)
        return response?.data // Adjust based on your API response structure
    }
)

// Async thunk for updating an order
export const updateOrder = createAsyncThunk<Order, { id: string; updatedData: APIUpdateOrderRequest }>(
    'orders/updateOrder',
    async ({ id, updatedData }) => {
        const response = await orderApi.updateOrder(id, updatedData)
        return response
    }
)