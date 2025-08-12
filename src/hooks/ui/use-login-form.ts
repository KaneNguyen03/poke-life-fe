import { useState, FormEvent } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { validateEmail, validateRequired, validateMinLength } from '@/utils/validators'

interface LoginFormData {
    email: string
    password: string
}

export const useLoginForm = () => {
    const { login, submitting } = useAuth()
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<Partial<LoginFormData>>({})

    const validateForm = (): boolean => {
        const newErrors: Partial<LoginFormData> = {}

        if (!validateRequired(formData.email)) {
            newErrors.email = 'Email is required'
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format'
        }

        if (!validateRequired(formData.password)) {
            newErrors.password = 'Password is required'
        } else if (!validateMinLength(formData.password, 6)) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        // Clear error when user starts typing
        if (errors[name as keyof LoginFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }

        try {
            await login(formData)
            window.location.href = '/'
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    return {
        formData,
        showPassword,
        setShowPassword,
        errors,
        submitting,
        handleInputChange,
        handleSubmit
    }
}
