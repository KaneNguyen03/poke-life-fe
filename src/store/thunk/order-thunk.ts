import orderApi from "@/services/order"
import { APICreateOrderRequest, APIUpdateOrderRequest, Order, OrdersState } from "@/types"
import { createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk for fetching all orders
export const fetchAllOrders = createAsyncThunk<OrdersState, { pageIndex?: number; pageSize?: number; keyword?: string }>(
    'orders/fetchAllOrders',
    async ({ pageIndex = 1, pageSize = 10, keyword = '' }) => {
        const response = await orderApi.getAllOrder(pageIndex, pageSize, keyword)
        return response // Ensure response matches Order[] type
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
// Async thunk for updating an order
export const updateOrder = createAsyncThunk<Order, { id: string; updatedData: APIUpdateOrderRequest }, { rejectValue: string }>(
    'orders/updateOrder',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const { total, phone, ...dataToUpdate } = updatedData

            await orderApi.updateOrder(id, dataToUpdate)

            // Extract only the necessary order details from the response
            const updatedOrder: Order = {
                OrderID: id,
                TotalPrice: updatedData.total ?? "",
                data: undefined,
                status: 0,
                CustomerID: "",
                CustomerName: updatedData.customerName,
                PhoneNumber: updatedData.phone ?? "",
                Address: updatedData.address,
                OrderStatus: updatedData.orderStatus,
                CreatedAt: "",
                UpdatedAt: "",
                IsDeleted: false,
                paymentMethod: updatedData.paymentMethod
            }

            return updatedOrder
        } catch (error) {
            console.error("Failed to update order:", error)
            return rejectWithValue("Failed to update order")
        }
    }
)