import React, { useState } from 'react'
import { FaTimes, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaSpinner, FaArrowRight, FaShoppingCart } from 'react-icons/fa'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { transferGuestCartToUser } from '@/store/slice/cart-slice'

interface CheckoutAuthModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    cartItemCount: number
    cartTotal: string
}

export const CheckoutAuthModal: React.FC<CheckoutAuthModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    cartItemCount,
    cartTotal
}) => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { login, signup } = useAuth()
    const dispatch = useDispatch()

    // Login form state
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    // Registration form state
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: ''
    })

    const [errors, setErrors] = useState<{[key: string]: string}>({})

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return re.test(String(email).toLowerCase())
    }

    const validateLoginForm = () => {
        const newErrors: {[key: string]: string} = {}
        
        if (!loginData.email) {
            newErrors.email = 'Email is required'
        } else if (!validateEmail(loginData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        
        if (!loginData.password) {
            newErrors.password = 'Password is required'
        } else if (loginData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateRegisterForm = () => {
        const newErrors: {[key: string]: string} = {}
        
        if (!registerData.username) {
            newErrors.username = 'Username is required'
        }
        
        if (!registerData.email) {
            newErrors.email = 'Email is required'
        } else if (!validateEmail(registerData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        
        if (!registerData.password) {
            newErrors.password = 'Password is required'
        } else if (registerData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        
        if (registerData.password !== registerData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        
        if (!registerData.phone) {
            newErrors.phone = 'Phone number is required'
        }
        
        if (!registerData.address) {
            newErrors.address = 'Address is required'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateLoginForm()) return
        
        setLoading(true)
        try {
            await login({ email: loginData.email, password: loginData.password })
            dispatch(transferGuestCartToUser())
            toast.success('Welcome back! Continuing with your order...')
            onSuccess()
        } catch (error) {
            toast.error('Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateRegisterForm()) return
        
        setLoading(true)
        try {
            await signup({
                email: registerData.email,
                password: registerData.password,
                username: registerData.username,
                phone: registerData.phone,
                address: registerData.address
            })
            dispatch(transferGuestCartToUser())
            toast.success('Account created! Continuing with your order...')
            onSuccess()
        } catch (error) {
            toast.error('Failed to create account. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <FaShoppingCart className="text-2xl" />
                            <div>
                                <h2 className="text-2xl font-bold">Complete Your Order</h2>
                                <p className="text-green-100">
                                    {cartItemCount} items • {cartTotal}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-300"
                            aria-label="Close modal"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab('login')}
                        className={`flex-1 py-4 px-6 font-semibold transition-colors duration-300 ${
                            activeTab === 'login'
                                ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        I have an account
                    </button>
                    <button
                        onClick={() => setActiveTab('register')}
                        className={`flex-1 py-4 px-6 font-semibold transition-colors duration-300 ${
                            activeTab === 'register'
                                ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        Create new account
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-96 overflow-y-auto">
                    {activeTab === 'login' ? (
                        <div>
                            <p className="text-gray-600 mb-6 text-center">
                                Sign in to continue with your order and access your account benefits
                            </p>

                            {/* Social Login Options */}
                            <div className="space-y-3 mb-6">
                                <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                                    <FaGoogle className="text-red-500" />
                                    <span className="font-medium">Continue with Google</span>
                                </button>
                                <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                                    <FaFacebook className="text-blue-600" />
                                    <span className="font-medium">Continue with Facebook</span>
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
                                </div>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-4 outline-none transition-all duration-300 ${
                                                errors.email 
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                                    : 'border-gray-300 focus:border-green-500 focus:ring-green-100'
                                            }`}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                            className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-4 outline-none transition-all duration-300 ${
                                                errors.password 
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                                    : 'border-gray-300 focus:border-green-500 focus:ring-green-100'
                                            }`}
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                                >
                                    {loading ? (
                                        <FaSpinner className="animate-spin" />
                                    ) : (
                                        <>
                                            <span>Sign In & Continue</span>
                                            <FaArrowRight />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-600 mb-6 text-center">
                                Create your account to enjoy faster checkout and order tracking
                            </p>

                            {/* Registration Form */}
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={registerData.username}
                                                onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                                                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-4 outline-none transition-all duration-300 ${
                                                    errors.username 
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                                        : 'border-gray-300 focus:border-green-500 focus:ring-green-100'
                                                }`}
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                value={registerData.email}
                                                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                                                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-4 outline-none transition-all duration-300 ${
                                                    errors.email 
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                                        : 'border-gray-300 focus:border-green-500 focus:ring-green-100'
                                                }`}
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={registerData.password}
                                                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                                className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-4 outline-none transition-all duration-300 ${
                                                    errors.password 
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                                        : 'border-gray-300 focus:border-green-500 focus:ring-green-100'
                                                }`}
                                                placeholder="Create password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={registerData.confirmPassword}
                                                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                                                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-4 outline-none transition-all duration-300 ${
                                                    errors.confirmPassword 
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                                        : 'border-gray-300 focus:border-green-500 focus:ring-green-100'
                                                }`}
                                                placeholder="Confirm password"
                                            />
                                        </div>
                                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={registerData.phone}
                                        onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-4 outline-none transition-all duration-300 ${
                                            errors.phone 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                                : 'border-gray-300 focus:border-green-500 focus:ring-green-100'
                                        }`}
                                        placeholder="Enter your phone number"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        value={registerData.address}
                                        onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
                                        rows={2}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-4 outline-none transition-all duration-300 resize-none ${
                                            errors.address 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                                : 'border-gray-300 focus:border-green-500 focus:ring-green-100'
                                        }`}
                                        placeholder="Enter your delivery address"
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                                >
                                    {loading ? (
                                        <FaSpinner className="animate-spin" />
                                    ) : (
                                        <>
                                            <span>Create Account & Continue</span>
                                            <FaArrowRight />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                    <p className="text-center text-sm text-gray-600">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CheckoutAuthModal
