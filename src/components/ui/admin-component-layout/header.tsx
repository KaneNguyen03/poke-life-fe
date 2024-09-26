// Header.tsx
import { Button } from "antd"
import { FiMenu } from "react-icons/fi"

interface HeaderProps {
    toggleSidebar: () => void
    username: string | undefined
    onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, username, onLogout }) => {
    return (
        <header className="flex justify-between items-center p-4 bg-white border-b">
            <Button
                className="md:hidden p-2 rounded-md hover:bg-gray-200"
                onClick={toggleSidebar}
            >
                <FiMenu size={24} />
            </Button>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
                <span>{username}</span>
                <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Admin"
                />
                <button
                    className='flex justify-center gap-2 items-center p-2 border border-red-600 rounded hover:bg-red-100 transition'
                    onClick={onLogout}
                >
                    <p className='underline-offset-2 text-red-600'>Logout</p>
                </button>
            </div>
        </header>
    )
}

export default Header
