import { navItems } from "@/constants"
import { useAuth } from "@/hooks/use-auth"
import { FoodManagement } from "@/layouts/layout-admin-ui/food-management"
import { MetricCard } from "@/layouts/layout-admin-ui/metric-card"
import { OrderManagement } from "@/layouts/layout-admin-ui/order-management"
import { UserManagement } from "@/layouts/layout-admin-ui/user-management"
import transactionApi from "@/services/transaction"
import { Button } from "antd"
import { useEffect, useState } from "react"
import { FiCoffee, FiMenu, FiPieChart, FiShoppingCart, FiUsers, FiX } from "react-icons/fi"
import { toast } from "react-toastify"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface Food {
  FoodID: string
  Name: string
  Description: string
  Price: string
  Calories: number
  Image: string
  CreatedAt: string
  UpdatedAt: string
  IsDeleted: boolean
}

interface Statistic {
  totalCustomers: number
  pendingOrders: number
  finishedOrders: number
  totalRevenue: number
  mostPopularFood: Food | null
  viewLineChartByMonth: DailyData[]
  viewLineChart: DailyData[] // Add this field for daily data
}

interface DailyData {
  day: number
  users: number
  orders: number
  revenue: number // Revenue for the day
}

const Admin = () => {
  const { user, logout } = useAuth()

  const [activeTab, setActiveTab] = useState("Dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [statistic, setStatistic] = useState<Statistic | null>(null)
  const [isMonthlyView, setIsMonthlyView] = useState(true) // State for toggling between monthly and daily view

  const fetchStatistic = async () => {
    try {
      const response = await transactionApi.getStatistics()
      if (response) {
        setStatistic(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch statistic", error)
    }
  }

  useEffect(() => {
    fetchStatistic()
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderChart = () => {
    const chartData = isMonthlyView ? statistic?.viewLineChartByMonth ?? [] : statistic?.viewLineChart ?? []

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={isMonthlyView ? "day" : "name"} tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
          <Line type="monotone" dataKey="revenue" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard title="Total Users" value={statistic?.totalCustomers?.toString() ?? ''} icon={<FiUsers />} />
              <MetricCard title="Pending Orders" value={statistic?.pendingOrders?.toString() ?? ''} icon={<FiShoppingCart />} />
              <MetricCard title="Finished Order" value={statistic?.finishedOrders?.toString() ?? ''} icon={<FiCoffee />} />
              <MetricCard title="Revenue" value={statistic?.totalRevenue?.toString() ?? ''} icon={<FiPieChart />} />
            </div>
            <div className="flex space-x-4 mb-4">
              <Button onClick={() => setIsMonthlyView(true)} type={isMonthlyView ? "primary" : "default"}>
                Monthly View
              </Button>
              <Button onClick={() => setIsMonthlyView(false)} type={!isMonthlyView ? "primary" : "default"}>
                Daily View
              </Button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">User, Order, and Revenue Trends</h3>
              {renderChart()}
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
            <span>{user?.Username}</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Admin"
            />
            <button
              className='flex justify-center gap-2 items-center p-2 border border-red-600 rounded hover:bg-red-100 transition'
              onClick={() => {
                logout()
                toast.success('Logged out successfully!')
              }}
            >
              <p className='underline-offset-2 text-red-600'>Logout</p>
            </button>
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
