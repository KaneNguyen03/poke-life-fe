import { dummyChartData, navItems } from "@/constants"
import { FoodManagement } from "@/layouts/layout-admin-ui/food-management"
import { MetricCard } from "@/layouts/layout-admin-ui/metric-card"
import { OrderManagement } from "@/layouts/layout-admin-ui/order-management"
import { UserManagement } from "@/layouts/layout-admin-ui/user-management"
import { Button } from "antd"
import { useState } from "react"
import { FiCoffee, FiMenu, FiPieChart, FiShoppingCart, FiUsers, FiX } from "react-icons/fi"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard title="Total Users" value="1,234" icon={<FiUsers />} />
              <MetricCard title="Pending Orders" value="56" icon={<FiShoppingCart />} />
              <MetricCard title="Popular Items" value="15" icon={<FiCoffee />} />
              <MetricCard title="Revenue" value="$12,345" icon={<FiPieChart />} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">User and Order Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dummyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      case "User":
        return <UserManagement />
      case "Order":
        return <OrderManagement />
      case "Food":
        return <FoodManagement />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <Button
          className="md:hidden absolute top-4 right-4 text-white"
          onClick={toggleSidebar}
        >
          <FiX size={24} />
        </Button>
        <nav>
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`block py-2.5 px-4 rounded transition duration-200 ${activeTab === item.name ? "bg-gray-700" : "hover:bg-gray-700"}`}
              onClick={() => setActiveTab(item.name)}
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </a>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <Button
            className="md:hidden p-2 rounded-md hover:bg-gray-200"
            onClick={toggleSidebar}
          >
            <FiMenu size={24} />
          </Button>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Admin User</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Admin"
            />
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}



export default Admin
