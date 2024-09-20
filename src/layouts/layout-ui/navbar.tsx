import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "antd"
import { useState } from "react"
import { FaShoppingCart, FaTimes, FaUser } from "react-icons/fa"
import { Link } from "react-scroll" // Updated import
import { useDispatch } from 'react-redux'
import CartModal from '@/components/card-modal'
import { toggleModal } from '@/store/slice/cart-slice'
import { useAuth } from '@/hooks/use-auth'
import Logo from "@/assets/logo.jpg"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { user } = useAuth()
    const dispatch = useDispatch()

    return (
        <header className="bg-green-50 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-lg font-semibold text-gray-700">
                    <img
                        decoding="async"
                        src={Logo}
                        alt="Call to Action"
                        className="block w-16 object-cover rounded-full"
                        onClick={() => window.location.href = "/"}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        {isMenuOpen ? (
                            <span>Close Menu</span>
                        ) : (
                            <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="fixed top-0 right-0 h-full w-64 bg-green-50 shadow-lg transform transition-transform duration-300 ease-in-out z-10 ">
                    <div className="p-4 ">
                        <Button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-4 right-4 text-green-600 hover:text-green-800"
                        >
                            <FaTimes className="text-2xl" />
                        </Button>
                        <nav className="mt-8">
                            <ul className="space-y-4">
                                <li>
                                    <Link to="hero" smooth duration={500} className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Home</Link>
                                </li>
                                <li>
                                    <Link to="menu" smooth duration={500} className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Menu</Link>
                                </li>
                                <li>
                                    <Link to="about" smooth duration={500} className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>About</Link>
                                </li>
                                <li>
                                    <Link to="custom-dishes" smooth duration={500} className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Custom Dishes</Link>
                                </li>
                                <li>
                                    <Link to="workouts" smooth duration={500} className="text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Workouts</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="mt-8 flex justify-around items-center">
                            {user ? (
                                <div className='flex justify-center gap-4 items-center'>
                                    <button
                                        className='flex justify-center gap-2 items-center p-2 border border-green-600 rounded hover:bg-green-100 transition'
                                        onClick={() => console.log("hello")}
                                    >
                                        <FaUser className="text-green-600 hover:text-green-400 cursor-pointer" />
                                        <span className='hidden sm:inline'>Profile</span>
                                    </button>
                                    <button
                                        className='flex justify-center gap-2 items-center p-2 border border-red-600 rounded hover:bg-red-100 transition'
                                        onClick={() => console.log("hello")}
                                    >
                                        <p className='underline-offset-2 text-red-600'>Logout</p>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className='flex justify-center gap-2 items-center p-2 border border-green-600 rounded hover:bg-green-100 transition'
                                    onClick={() => window.location.href = "/login"}
                                >
                                    <FaUser className="text-green-600 hover:text-green-400 cursor-pointer" />
                                    <span>Login</span>
                                </button>
                            )}
                            <FaShoppingCart
                                className="text-green-600 hover:text-green-400 cursor-pointer"
                                onClick={() => {
                                    dispatch(toggleModal())
                                    setIsMenuOpen(false)
                                }}
                            />
                        </div>
                    </div>
                </div>
            )
            }
            <CartModal />
        </header >
    )
}
