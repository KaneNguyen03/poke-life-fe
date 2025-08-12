import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from "react"
import { FaShoppingCart, FaTimes, FaUser, FaSearch } from "react-icons/fa"
import { Link } from "react-scroll"
import { useDispatch, useSelector } from 'react-redux'
import CartModal from '@/components/card-modal'
import { toggleModal } from '@/store/slice/cart-slice'
import { useAuth } from '@/hooks/use-auth'
import Logo from "@/assets/logo.jpg"
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { RootState } from '@/store'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [showCartPreview, setShowCartPreview] = useState(false)
    const { user, logout } = useAuth()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    return (
        <>
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-lg' 
                    : 'bg-white/90 backdrop-blur-sm'
            }`}>
                <div className="container mx-auto px-4">
                    {/* Main Navigation */}
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div 
                            className="flex items-center space-x-3 cursor-pointer group"
                            onClick={() => window.location.href = "/"}
                        >
                            <img
                                src={Logo}
                                alt="Poke Life"
                                className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold text-gray-900">Poke Life</h1>
                                <p className="text-xs text-green-600 font-medium">Fresh & Healthy</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {["hero", "menu", "about", "blog", "workouts", "reviews"].map((section) => (
                                <Link
                                    key={section}
                                    to={section}
                                    smooth
                                    duration={500}
                                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 cursor-pointer relative group"
                                >
                                    {t(`nav.${section}`)}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-3">
                            {/* Search (Desktop) */}
                            <button 
                                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                                aria-label="Search menu items"
                            >
                                <FaSearch className="text-gray-600" />
                            </button>

                            {/* User Actions */}
                            {user ? (
                                <div className="hidden md:flex items-center space-x-3">
                                    <button
                                        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-50 hover:bg-green-100 transition-colors duration-300"
                                        onClick={() => window.location.href = "/profile"}
                                    >
                                        <FaUser className="text-green-600" />
                                        <span className="text-sm font-medium text-green-700">
                                            {user.Username || 'Profile'}
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="hidden md:flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors duration-300"
                                    onClick={() => window.location.href = "/login"}
                                >
                                    <FaUser />
                                    <span>{t('nav.login')}</span>
                                </button>
                            )}

                            {/* Cart Button with Badge */}
                            <div className="relative">
                                <button
                                    className="flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-300 transform hover:scale-105"
                                    onClick={() => dispatch(toggleModal())}
                                    onMouseEnter={() => setShowCartPreview(true)}
                                    onMouseLeave={() => setShowCartPreview(false)}
                                >
                                    <FaShoppingCart className="text-lg" />
                                    {getTotalItems() > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                                            {getTotalItems()}
                                        </span>
                                    )}
                                </button>

                                {/* Cart Preview Tooltip */}
                                {showCartPreview && cartItems.length > 0 && (
                                    <div className="absolute right-0 top-14 w-80 bg-white rounded-xl shadow-2xl border p-4 z-50">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-gray-900">{t('cart.title')}</h3>
                                            <span className="text-sm text-gray-500">{getTotalItems()} items</span>
                                        </div>
                                        <div className="space-y-2 max-h-32 overflow-y-auto">
                                            {cartItems.slice(0, 3).map((item, index) => (
                                                <div key={index} className="flex items-center space-x-3">
                                                    <img 
                                                        src={item.Image} 
                                                        alt={item.Name}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{item.Name}</p>
                                                        <p className="text-xs text-gray-500">{item.quantity}x {formatCurrency(item.Price)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-3 border-t">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="font-semibold">Total:</span>
                                                <span className="font-bold text-green-600">{formatCurrency(getTotalPrice())}</span>
                                            </div>
                                            <button 
                                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors duration-300"
                                                onClick={() => {
                                                    dispatch(toggleModal())
                                                    setShowCartPreview(false)
                                                }}
                                            >
                                                View Cart
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                            >
                                {isMenuOpen ? (
                                    <FaTimes className="text-gray-700" />
                                ) : (
                                    <FontAwesomeIcon icon={faBars} className="text-gray-700" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40" onClick={() => setIsMenuOpen(false)} />
                )}

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden">
                        <div className="p-6">
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <img src={Logo} alt="Poke Life" className="w-10 h-10 rounded-full object-cover" />
                                    <span className="font-bold text-gray-900">Menu</span>
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                                    aria-label="Close menu"
                                >
                                    <FaTimes className="text-gray-600" />
                                </button>
                            </div>

                            {/* Mobile Navigation Links */}
                            <nav className="mb-8">
                                <ul className="space-y-4">
                                    {["hero", "menu", "about", "blog", "workouts", "reviews"].map((section) => (
                                        <li key={section}>
                                            <Link
                                                to={section}
                                                smooth
                                                duration={500}
                                                className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-300 cursor-pointer"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span className="font-medium">{t(`nav.${section}`)}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Mobile User Actions */}
                            <div className="space-y-4 pt-6 border-t border-gray-200">
                                {user ? (
                                    <>
                                        <button
                                            className="w-full flex items-center space-x-3 py-3 px-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-300"
                                            onClick={() => {
                                                window.location.href = "/profile"
                                                setIsMenuOpen(false)
                                            }}
                                        >
                                            <FaUser className="text-green-600" />
                                            <span className="font-medium text-green-700">
                                                {user.Username || 'Profile'}
                                            </span>
                                        </button>
                                        <button
                                            className="w-full flex items-center justify-center py-3 px-4 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors duration-300"
                                            onClick={() => {
                                                logout()
                                                toast.success('Logged out successfully!')
                                                setIsMenuOpen(false)
                                            }}
                                        >
                                            <span className="font-medium">{t('nav.logout')}</span>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-300"
                                        onClick={() => {
                                            window.location.href = "/login"
                                            setIsMenuOpen(false)
                                        }}
                                    >
                                        <FaUser />
                                        <span>{t('nav.login')}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>
            <CartModal />
        </>
    )
}
