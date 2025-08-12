import React from "react"
import Chat from "@/components/chat/chat"
import { AdminHeader } from "@/layouts/admin/header"
import { AdminSidebar } from "@/layouts/admin/sidebar"
import { useAuth } from "@/hooks/use-auth"
import { useAdminData } from "@/hooks/api/use-admin-data"
import { useAdminUI } from "@/hooks/ui/use-admin-ui"
import Dashboard from "@/layouts/layout-admin-ui/admin-dashboard"
import { FoodManagement } from "@/layouts/layout-admin-ui/food-management"
import { OrderManagement } from "@/layouts/layout-admin-ui/order-management"
import { UserManagement } from "@/layouts/layout-admin-ui/user-management"
import { toast } from "react-toastify"

const Admin: React.FC = () => {
  const { user, logout } = useAuth()
  const { statistic } = useAdminData()
  const { 
    activeTab, 
    setActiveTab, 
    isSidebarOpen, 
    toggleSidebar, 
    isMonthlyView, 
    setIsMonthlyView 
  } = useAdminUI()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully!')
    } catch {
      toast.error('Error logging out')
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <Dashboard 
            statistic={statistic} 
            isMonthlyView={isMonthlyView} 
            setIsMonthlyView={setIsMonthlyView} 
          />
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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          toggleSidebar={toggleSidebar} 
          username={user?.Username} 
          onLogout={handleLogout} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {renderContent()}
          </div>
        </main>
      </div>
      <Chat />
    </div>
  )
}

export default Admin
