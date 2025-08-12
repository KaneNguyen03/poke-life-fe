import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/slice/cart-slice'
import { APIFoodResponse } from '@/types'
import { toast } from 'react-toastify'

interface CartItem extends APIFoodResponse {
    quantity: number
}

export const useCart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)

    const addItem = (item: APIFoodResponse) => {
        const cartItem: CartItem = { ...item, quantity: 1 }
        dispatch(addToCart(cartItem))
        toast.success(`${item.Name} has been added to your cart!`, {
            position: "top-right",
            autoClose: 3000,
        })
    }

    const removeItem = (index: number) => {
        dispatch(removeFromCart(index))
    }

    const updateItemQuantity = (index: number, quantity: number) => {
        dispatch(updateQuantity({ index, quantity }))
    }

    const clearAllItems = () => {
        dispatch(clearCart())
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)
    }

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    return {
        cartItems,
        addItem,
        removeItem,
        updateItemQuantity,
        clearAllItems,
        getTotalPrice,
        getTotalItems
    }
}
