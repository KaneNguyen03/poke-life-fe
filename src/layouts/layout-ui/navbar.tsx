import { Button } from "antd"
import { useState } from "react"
import { FaShoppingCart, FaTimes, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <header className="bg-green-50 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-lg font-semibold text-gray-700">
                    <img
                        decoding="async"
                        srcSet="https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png?scale-down-to=512 512w, https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png 1961w"
                        src="https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png"
                        alt="Call to Action"
                        className="block w-32 object-cover rounded-full"
                    />
                </div>
                <div className="flex items-center">
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
                <div className="fixed top-0 right-0 h-full w-64 bg-green-50 shadow-lg transform transition-transform duration-300 ease-in-out z-10">
                    <div className="p-4">
                        <Button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-4 right-4 text-green-600 hover:text-green-800"
                        >
                            <FaTimes className="text-2xl" />
                        </Button>
                        <nav className="mt-8">
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                                </li>
                                <li>
                                    <Link to="/menu" className="text-gray-700 hover:text-gray-900">Menu</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="mt-8 flex justify-around">
                            <FaUser className="text-green-600 hover:text-green-400 cursor-pointer" />
                            <FaShoppingCart className="text-green-600 hover:text-green-400 cursor-pointer" />
                        </div>
                    </div>
                </div>
            )}

        </header>
    )
}
