import React, { useState } from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaShoppingCart, FaTimes, FaUser } from "react-icons/fa"
import { Link } from "react-scroll"
import { useDispatch } from 'react-redux'
import { useAuth } from '@/hooks/use-auth'
import { toggleModal } from '@/store/slice/cart-slice'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import Logo from "@/assets/logo.jpg"
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export const MainNavbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { user, logout } = useAuth()
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const handleLogout = async () => {
        try {
            await logout()
            toast.success(t('auth.logoutSuccess'))
        } catch {
            toast.error(t('common.error'))
        }
    }

    const handleCartClick = () => {
        dispatch(toggleModal())
        setIsMenuOpen(false)
    }

    const navItems = [
        { key: 'hero', labelKey: 'nav.home' },
        { key: 'about', labelKey: 'nav.about' },
        { key: 'menu', labelKey: 'nav.menu' },
        // Note: Custom dishes section is hidden per requirements but code preserved
        // { key: 'custom-dishes', labelKey: 'nav.customDishes' },
        { key: 'workouts', labelKey: 'nav.workouts' },
    ]

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
            <nav className="container mx-auto px-4 py-3" role="navigation" aria-label="Main navigation">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <button
                            onClick={() => window.location.href = "/"}
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
                            aria-label="Go to homepage"
                        >
                            <img
                                src={Logo}
                                alt="Poke Life Logo"
                                className="w-12 h-12 object-cover rounded-full shadow-md"
                                loading="eager"
                            />
                            <span className="text-xl font-bold text-gray-800 hidden sm:block">
                                Poke Life
                            </span>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                to={item.key}
                                smooth
                                duration={500}
                                className="text-gray-700 hover:text-green-600 font-medium cursor-pointer transition-colors duration-200 relative group"
                            >
                                {t(item.labelKey)}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <LanguageSwitcher variant="buttons" />
                        
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <Button
                                    onClick={() => window.location.href = "/profile"}
                                    variant="secondary"
                                    size="sm"
                                    className="flex items-center space-x-2"
                                >
                                    <FaUser />
                                    <span className="hidden md:inline">{user.Username}</span>
                                </Button>
                                <Button
                                    onClick={handleLogout}
                                    variant="danger"
                                    size="sm"
                                >
                                    {t('nav.logout')}
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => window.location.href = "/login"}
                                variant="primary"
                                className="flex items-center space-x-2"
                            >
                                <FaUser />
                                <span>{t('nav.login')}</span>
                            </Button>
                        )}

                        <Button
                            onClick={handleCartClick}
                            variant="success"
                            className="flex items-center space-x-2 relative"
                            aria-label={t('nav.cart')}
                        >
                            <FaShoppingCart />
                            <span className="hidden md:inline">{t('nav.cart')}</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        variant="secondary"
                        className="lg:hidden"
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <FaTimes className="w-5 h-5" />
                        ) : (
                            <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
                        )}
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t shadow-lg">
                    <div className="container mx-auto px-4 py-6 space-y-4">
                        {/* Mobile Navigation Links */}
                        <nav className="space-y-3" role="navigation" aria-label="Mobile navigation">
                            {navItems.map((item) => (
                                <Link
                                    key={item.key}
                                    to={item.key}
                                    smooth
                                    duration={500}
                                    className="block text-gray-700 hover:text-green-600 font-medium py-2 cursor-pointer transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t(item.labelKey)}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Language Switcher */}
                        <div className="pt-4 border-t">
                            <LanguageSwitcher />
                        </div>

                        {/* Mobile Actions */}
                        <div className="pt-4 space-y-3">
                            {user ? (
                                <div className="space-y-2">
                                    <Button
                                        onClick={() => {
                                            window.location.href = "/profile"
                                            setIsMenuOpen(false)
                                        }}
                                        variant="secondary"
                                        className="w-full flex items-center justify-center space-x-2"
                                    >
                                        <FaUser />
                                        <span>{t('nav.profile')}: {user.Username}</span>
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleLogout()
                                            setIsMenuOpen(false)
                                        }}
                                        variant="danger"
                                        className="w-full"
                                    >
                                        {t('nav.logout')}
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={() => {
                                        window.location.href = "/login"
                                        setIsMenuOpen(false)
                                    }}
                                    variant="primary"
                                    className="w-full flex items-center justify-center space-x-2"
                                >
                                    <FaUser />
                                    <span>{t('nav.login')}</span>
                                </Button>
                            )}

                            <Button
                                onClick={handleCartClick}
                                variant="success"
                                className="w-full flex items-center justify-center space-x-2"
                            >
                                <FaShoppingCart />
                                <span>{t('nav.cart')}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
