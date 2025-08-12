import React from 'react'
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi"
import { Button } from "@/components/ui/button"

interface HeaderProps {
    toggleSidebar: () => void
    username: string | undefined
    onLogout: () => void
}

export const AdminHeader: React.FC<HeaderProps> = ({ 
    toggleSidebar, 
    username, 
    onLogout 
}) => {
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center space-x-4">
                <Button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={toggleSidebar}
                    variant="ghost"
                    size="sm"
                >
                    <FiMenu size={20} />
                </Button>
                
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500">Manage your restaurant efficiently</p>
                </div>
            </div>
            
            <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full">
                        <FiUser className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-sm">
                        <p className="font-medium text-gray-900">{username}</p>
                        <p className="text-gray-500">Administrator</p>
                    </div>
                </div>
                
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onLogout}
                    className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                </Button>
            </div>
        </header>
    )
}
