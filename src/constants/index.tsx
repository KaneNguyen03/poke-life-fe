import { FiCoffee, FiPieChart, FiShoppingCart, FiUsers } from "react-icons/fi"

export const navItems = [
    { name: "Dashboard", icon: <FiPieChart /> },
    { name: "User", icon: <FiUsers /> },
    { name: "Order", icon: <FiShoppingCart /> },
    { name: "Food", icon: <FiCoffee /> },
]

export const dummyChartData = [
    { name: "Jan", users: 400, orders: 240, amt: 2400 },
    { name: "Feb", users: 300, orders: 139, amt: 2210 },
    { name: "Mar", users: 200, orders: 980, amt: 2290 },
    { name: "Apr", users: 278, orders: 390, amt: 2000 },
    { name: "May", users: 189, orders: 480, amt: 2181 },
    { name: "Jun", users: 239, orders: 380, amt: 2500 },
]