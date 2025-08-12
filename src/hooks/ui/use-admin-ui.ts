import { useState } from 'react'

export const useAdminUI = () => {
    const [activeTab, setActiveTab] = useState("Dashboard")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMonthlyView, setIsMonthlyView] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return {
        activeTab,
        setActiveTab,
        isSidebarOpen,
        toggleSidebar,
        isMonthlyView,
        setIsMonthlyView
    }
}
