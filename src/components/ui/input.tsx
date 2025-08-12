import React from 'react'
import { cn } from '@/utils/cn'

interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'url'
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    required?: boolean
    className?: string
    name?: string
    id?: string
    label?: string
    error?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'filled' | 'outline'
}

export const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled = false,
    required = false,
    className = '',
    name,
    id,
    label,
    error,
    leftIcon,
    rightIcon,
    size = 'md',
    variant = 'default'
}) => {
    const baseClasses = 'w-full border rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
    
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg'
    }
    
    const variantClasses = {
        default: 'bg-white border-gray-300 hover:border-gray-400',
        filled: 'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300',
        outline: 'bg-transparent border-gray-300 hover:border-green-400'
    }
    
    const errorClasses = error 
        ? 'border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500' 
        : variantClasses[variant]
        
    const disabledClasses = disabled 
        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
        : ''

    const iconPadding = {
        left: leftIcon ? (size === 'sm' ? 'pl-10' : size === 'lg' ? 'pl-14' : 'pl-12') : '',
        right: rightIcon ? (size === 'sm' ? 'pr-10' : size === 'lg' ? 'pr-14' : 'pr-12') : ''
    }

    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className={cn(
                        "absolute inset-y-0 left-0 flex items-center pointer-events-none",
                        size === 'sm' ? 'pl-3' : size === 'lg' ? 'pl-4' : 'pl-3'
                    )}>
                        <div className="text-gray-400">
                            {leftIcon}
                        </div>
                    </div>
                )}
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={cn(
                        baseClasses,
                        sizeClasses[size],
                        errorClasses,
                        disabledClasses,
                        iconPadding.left,
                        iconPadding.right,
                        className
                    )}
                />
                {rightIcon && (
                    <div className={cn(
                        "absolute inset-y-0 right-0 flex items-center pointer-events-none",
                        size === 'sm' ? 'pr-3' : size === 'lg' ? 'pr-4' : 'pr-3'
                    )}>
                        <div className="text-gray-400">
                            {rightIcon}
                        </div>
                    </div>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    )
}
