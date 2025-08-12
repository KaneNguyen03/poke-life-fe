// src/features/orders/ordersSlice.ts
import { Order } from '@/types' // Adjust the types as needed
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createOrder, fetchAllOrders, updateOrder } from '../thunk/order-thunk'

interface OrderState {
    orders: Order[] // Ensure it's an array
    loading: boolean
    pagination: { totalPages: number, pageIndex: number, pageSize: number }
    error: string | null
    message: string | null
}

const initialState: OrderState = {
    orders: [], // Initialize as an empty array
    loading: false,
    pagination: { totalPages: 1, pageIndex: 1, pageSize: 5 }, // Set default values
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
                state.orders = action.payload.orders
                state.pagination = action.payload.pagination ?? { totalPages: 0, pageIndex: 0, pageSize: 0 } // Set pagination data to state with default values
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch orders'
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload) // Add the new order to the orders array
            })
            .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {

                if (action.payload) {
                    state.message = "Order updated successfully!"
                    const index = state.orders.findIndex(order => order.OrderID === action.payload.OrderID)

                    if (index !== -1) {
                        state.orders[index] = { ...state.orders[index], ...action.payload } // Merge the updated fields
                    } else {
                        console.warn(`Order with ID ${action.payload.OrderID} not found in state.orders`)
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
// eslint-disable-next-line no-empty-pattern
export const { } = ordersSlice.actions

export default ordersSlice.reducer
