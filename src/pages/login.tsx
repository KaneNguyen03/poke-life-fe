import Background from '@/assets/background.jpg'
import { useAuth } from '@/hooks/use-auth'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function Login() {
  const { login, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }



  const handleEmailChange = (e: { target: { value: string } }) => {
    setEmail(e.target.value)
    if (!validateEmail(e.target.value)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
  }

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(e.target.value)
    if (e.target.value.length < 5) {
      setPasswordError('Password must be at least 6 characters long')
    } else {
      setPasswordError('')
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!emailError && !passwordError) {
      setIsLoading(true)
      const result = await login({ email, password })
      if (result) {
        await toast.success('Login successful')
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
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                placeholder="Enter your password"
                aria-invalid={passwordError ? 'true' : 'false'}
                aria-describedby={passwordError ? 'password-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
            </div>
            {passwordError && (
              <p id="password-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                {passwordError}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2 h-5 w-5" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
