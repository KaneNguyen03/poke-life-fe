// src/features/orders/ordersSlice.ts
import { Order } from '@/types' // Adjust the types as needed
import { createSlice } from '@reduxjs/toolkit'
import { createOrder, fetchAllOrders, updateOrder } from '../thunk/order-thunk'

interface OrderState {
    orders: Order[] // Ensure it's an array
    loading: boolean
    pagination: { totalPages: number }
    error: string | null
    message: string | null
}

const initialState: OrderState = {
    orders: [], // Initialize as an empty array
    loading: false,
    pagination: { totalPages: 1 },
    error: null,
    message: null,
}

// Create slice
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // Add any synchronous actions here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload // Set fetched orders to state
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch orders'
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload) // Add the new order to the orders array
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                // Check if action.payload is defined
                if (action.payload) {
                    if (action.payload.status === 400) {
                        state.error = action.payload.response.data.message[0] // Assign the error message to state.error
                        return
                    }
                    state.message = "Order updated successfully!"
                    const index = state.orders.findIndex(order => order.OrderID === action.payload.OrderID)
                    if (index !== -1) {
                        state.orders[index] = action.payload // Update the order in the state
                    }
                }
            })
            // Add more cases as needed
            .addCase(updateOrder.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update order'
            })
    },
})

// Export actions and reducer
export const { } = ordersSlice.actions

export default ordersSlice.reducer
