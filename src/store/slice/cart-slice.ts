import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Ingredient {
    Name: string
    Quantity: number
    IngredientID: string
}
interface CartItem {
    Name: string
    Image: string
    quantity: number
    Price: number
    FoodID: string

    Note?: string
    Ingredients?: Ingredient[]
}

interface CartState {
    items: CartItem[]
    isModalOpen: boolean
}

const initialState: CartState = {
    items: [],
    isModalOpen: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.Name === action.payload.Name)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items.splice(action.payload, 1)
        },
        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen
        },
        updateQuantity: (state, action: PayloadAction<{ index: number; quantity: number }>) => {
            const { index, quantity } = action.payload
            const item = state.items[index]
            if (item) {
                item.quantity = quantity
            }
        },
        clearCart: (state) => {
            state.items = []
        },
    },
})

export const { addToCart, removeFromCart, toggleModal, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
