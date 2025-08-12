import React from 'react'
import { FiX } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { ADMIN_NAV_ITEMS } from "@/utils/constants/navigation"

interface SidebarProps {
    isSidebarOpen: boolean
    toggleSidebar: () => void
    activeTab: string
    setActiveTab: (tab: string) => void
}

export const AdminSidebar: React.FC<SidebarProps> = ({ 
    isSidebarOpen, 
    toggleSidebar, 
    activeTab, 
    setActiveTab 
}) => {
    return (
        <>
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
            
            <div
                className={`bg-white border-r border-gray-200 w-64 space-y-1 py-6 px-3 absolute inset-y-0 left-0 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:relative md:translate-x-0 transition duration-300 ease-in-out z-50 shadow-lg md:shadow-none`}
            >
                {/* Mobile close button */}
                <div className="md:hidden flex justify-between items-center mb-6 px-3">
                    <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                    <Button
                        onClick={toggleSidebar}
                        variant="ghost"
                        size="sm"
                        className="p-2"
                    >
                        <FiX size={20} />
                    </Button>
                </div>
                
                {/* Logo/Brand area for desktop */}
                <div className="hidden md:block mb-8 px-3">
                    <h2 className="text-xl font-bold text-gray-900">PokeLife</h2>
                    <p className="text-sm text-gray-500">Admin Panel</p>
                </div>
                
                <nav className="space-y-1">
                    {ADMIN_NAV_ITEMS.map((item) => (
                        <button
                            key={item.name}
                            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                                activeTab === item.name 
                                    ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-500" 
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                            onClick={() => {
                                setActiveTab(item.name)
                                // Close sidebar on mobile after selection
                                if (window.innerWidth < 768) {
                                    toggleSidebar()
                                }
                            }}
                        >
                            <div className={`flex-shrink-0 ${
                                activeTab === item.name ? "text-indigo-600" : "text-gray-400"
                            }`}>
                                <item.icon size={20} />
                            </div>
                            <span className="font-medium">{item.name}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </>
    )
}
