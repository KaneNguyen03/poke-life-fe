import { FiCoffee, FiPieChart, FiShoppingCart, FiUsers } from "react-icons/fi"

export const ADMIN_NAV_ITEMS = [
    { name: "Dashboard", icon: FiPieChart },
    { name: "User", icon: FiUsers },
    { name: "Order", icon: FiShoppingCart },
    { name: "Food", icon: FiCoffee },
]

export const MAIN_NAV_SECTIONS = [
    "hero",
    "menu", 
    "about",
    "custom-dishes",
    "workouts"
] as const

export const ORDER_STATUSES = [
    'Pending',
    'Cooking', 
    'Finished',
    'Cancelled'
] as const

export const PAYMENT_METHODS = [
    'COD',
    'Bank Transfer'
] as const
