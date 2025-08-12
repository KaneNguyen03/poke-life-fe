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
    guestEmail?: string
    isGuestCheckout: boolean
}

// Load cart from localStorage on initialization
const loadCartFromStorage = (): CartItem[] => {
    try {
        const savedCart = localStorage.getItem('guestCart')
        return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
        console.error('Failed to load cart from storage:', error)
        return []
    }
}

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
    try {
        localStorage.setItem('guestCart', JSON.stringify(items))
    } catch (error) {
        console.error('Failed to save cart to storage:', error)
    }
}

const initialState: CartState = {
    items: loadCartFromStorage(),
    isModalOpen: false,
    guestEmail: '',
    isGuestCheckout: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => 
                item.FoodID === action.payload.FoodID || 
                (item.Name === action.payload.Name && item.FoodID === action.payload.FoodID)
            )
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
            // Save to localStorage for guest persistence
            saveCartToStorage(state.items)
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items.splice(action.payload, 1)
            saveCartToStorage(state.items)
        },
        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen
        },
        updateQuantity: (state, action: PayloadAction<{ index: number; quantity: number }>) => {
            const { index, quantity } = action.payload
            const item = state.items[index]
            if (item) {
                if (quantity <= 0) {
                    state.items.splice(index, 1)
                } else {
                    item.quantity = quantity
                }
            }
            saveCartToStorage(state.items)
        },
        clearCart: (state) => {
            state.items = []
            state.guestEmail = ''
            state.isGuestCheckout = false
            localStorage.removeItem('guestCart')
        },
        setGuestCheckout: (state, action: PayloadAction<{ email: string }>) => {
            state.guestEmail = action.payload.email
            state.isGuestCheckout = true
        },
        transferGuestCartToUser: (state) => {
            // Clear guest data after successful login/registration
            state.guestEmail = ''
            state.isGuestCheckout = false
            // Keep items but clear guest storage
            localStorage.removeItem('guestCart')
        },
        loadUserCart: (state, action: PayloadAction<CartItem[]>) => {
            // Merge guest cart with user cart if both exist
            const userCartItems = action.payload
            const guestItems = state.items
            
            if (guestItems.length > 0 && userCartItems.length > 0) {
                // Merge carts, prioritizing guest cart for recent additions
                const mergedItems = [...userCartItems]
                
                guestItems.forEach(guestItem => {
                    const existingIndex = mergedItems.findIndex(item => 
                        item.FoodID === guestItem.FoodID
                    )
                    if (existingIndex >= 0) {
                        mergedItems[existingIndex].quantity += guestItem.quantity
                    } else {
                        mergedItems.push(guestItem)
                    }
                })
                
                state.items = mergedItems
            } else if (userCartItems.length > 0) {
                state.items = userCartItems
            }
            // If only guest items, keep them
            
            // Clear guest storage after loading user cart
            localStorage.removeItem('guestCart')
        },
    },
})

export const { 
    addToCart, 
    removeFromCart, 
    toggleModal, 
    updateQuantity, 
    clearCart,
    setGuestCheckout,
    transferGuestCartToUser,
    loadUserCart
} = cartSlice.actions

export default cartSlice.reducer
