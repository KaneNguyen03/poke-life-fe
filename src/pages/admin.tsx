// Admin.tsx
import Header from "@/components/ui/admin-component-layout/header"
import Sidebar from "@/components/ui/admin-component-layout/side-bar"
import { useAuth } from "@/hooks/use-auth"
import Dashboard from "@/layouts/layout-admin-ui/admin-dashboard"
import { FoodManagement } from "@/layouts/layout-admin-ui/food-management"
import { OrderManagement } from "@/layouts/layout-admin-ui/order-management"
import { UserManagement } from "@/layouts/layout-admin-ui/user-management"
import transactionApi from "@/services/transaction"
import { Statistic } from "@/types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Admin = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [statistic, setStatistic] = useState<Statistic | null>(null)
  const [isMonthlyView, setIsMonthlyView] = useState(true)

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

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard statistic={statistic} isMonthlyView={isMonthlyView} setIsMonthlyView={setIsMonthlyView} />
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
    <div className="flex h-screen bg-green-50">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} username={user?.Username} onLogout={() => {
          logout()
          toast.success('Logged out successfully!')
        }} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default Admin
