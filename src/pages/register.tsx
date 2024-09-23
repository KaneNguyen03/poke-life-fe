import Background from '@/assets/background.jpg'
import { useAuth } from '@/hooks/use-auth'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function Register() {
    const { signup, user } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [addressError, setAddressError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return re.test(String(email).toLowerCase())
    }

    const validatePhone = (phone: string) => {
        const re = /^[0-9]{10,11}$/
        return re.test(String(phone))
    }

    if (user) {
        window.location.href = "/"
    }

    const handleEmailChange = (e: { target: { value: string } }) => {
        setEmail(e.target.value)
        if (!validateEmail(e.target.value)) {
            setEmailError('Invalid email format')
        } else {
            setEmailError('')
        }
    }

    const handlePasswordChange = (e: { target: { value: string } }) => {
        setPassword(e.target.value)
        if (e.target.value.length < 6) {
            setPasswordError('Password must be at least 6 characters long')
        } else {
            setPasswordError('')
        }

        if (confirmPassword && e.target.value !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match')
        } else {
            setConfirmPasswordError('')
        }
    }

    const handleConfirmPasswordChange = (e: { target: { value: string } }) => {
        setConfirmPassword(e.target.value)
        if (password !== e.target.value) {
            setConfirmPasswordError('Passwords do not match')
        } else {
            setConfirmPasswordError('')
        }
    }

    const handleUsernameChange = (e: { target: { value: string } }) => {
        setUsername(e.target.value)
        if (e.target.value.length < 3) {
            setUsernameError('Username must be at least 3 characters long')
        } else {
            setUsernameError('')
        }
    }

    const handlePhoneChange = (e: { target: { value: string } }) => {
        setPhone(e.target.value)
        if (!validatePhone(e.target.value)) {
            setPhoneError('Invalid phone number')
        } else {
            setPhoneError('')
        }
    }

    const handleAddressChange = (e: { target: { value: string } }) => {
        setAddress(e.target.value)
        if (e.target.value.length < 5) {
            setAddressError('Address must be at least 5 characters long')
        } else {
            setAddressError('')
        }
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (!emailError && !passwordError && !confirmPasswordError && !usernameError && !phoneError && !addressError) {
            setIsLoading(true)
            const result = await signup({ email, password, username, phone, address })
            if (result) {
                await toast.success('Registration successful')
                window.location.href = "/"
            }

            setIsLoading(false)
        }
    }

    useEffect(() => {
        const emailInput = document.getElementById('email')
        const passwordInput = document.getElementById('password')
        if (emailInput) emailInput.ariaAutoComplete = 'email'
        if (passwordInput) passwordInput.ariaAutoComplete = 'current-password'
    }, [])

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4"
            style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-300 ease-in-out transform hover:scale-105">
                <div className="mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back
                    </button>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            required
                            onChange={handleEmailChange}
                            className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                            placeholder="Enter your email"
                            list="email-suggestions"
                            aria-invalid={emailError ? 'true' : 'false'}
                            aria-describedby={emailError ? 'email-error' : undefined}
                        />
                        <datalist id="email-suggestions">
                            {commonDomains.map((domain) => (
                                <option key={domain} value={`${email.split('@')[0]}@${domain}`} />
                            ))}
                        </datalist>
                        {emailError && (
                            <p id="email-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                                {emailError}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            required
                            value={username}
                            onChange={handleUsernameChange}
                            className={`w-full px-3 py-2 border ${usernameError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                            placeholder="Enter your username"
                            aria-invalid={usernameError ? 'true' : 'false'}
                            aria-describedby={usernameError ? 'username-error' : undefined}
                        />
                        {usernameError && (
                            <p id="username-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                                {usernameError}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            required
                            onChange={handlePhoneChange}
                            className={`w-full px-3 py-2 border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                            placeholder="Enter your phone number"
                            aria-invalid={phoneError ? 'true' : 'false'}
                            aria-describedby={phoneError ? 'phone-error' : undefined}
                        />
                        {phoneError && (
                            <p id="phone-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                                {phoneError}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            required
                            onChange={handleAddressChange}
                            className={`w-full px-3 py-2 border ${addressError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                            placeholder="Enter your address"
                            aria-invalid={addressError ? 'true' : 'false'}
                            aria-describedby={addressError ? 'address-error' : undefined}
                        />
                        {addressError && (
                            <p id="address-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                                {addressError}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                required
                                onChange={handlePasswordChange}
                                className={`w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                                placeholder="Enter your password"
                                aria-invalid={passwordError ? 'true' : 'false'}
                                aria-describedby={passwordError ? 'password-error' : undefined}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {passwordError && (
                            <p id="password-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                                {passwordError}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirm-password"
                                value={confirmPassword}
                                required
                                onChange={handleConfirmPasswordChange}
                                className={`w-full px-3 py-2 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                                placeholder="Confirm your password"
                                aria-invalid={confirmPasswordError ? 'true' : 'false'}
                                aria-describedby={confirmPasswordError ? 'confirm-password-error' : undefined}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {confirmPasswordError && (
                            <p id="confirm-password-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                                {confirmPasswordError}
                            </p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin mr-2" />
                                    Registering...
                                </span>
                            ) : (
                                'Register'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
