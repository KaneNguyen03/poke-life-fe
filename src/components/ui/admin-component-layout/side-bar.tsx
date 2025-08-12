// Sidebar.tsx
import { navItems } from "@/constants"
import { Button } from "antd"
import { FiX } from "react-icons/fi"

interface SidebarProps {
    isSidebarOpen: boolean
    toggleSidebar: () => void
    activeTab: string
    setActiveTab: (tab: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar, activeTab, setActiveTab }) => {
    return (
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
    )
}

export default Sidebar
