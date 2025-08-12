import React from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    disabled?: boolean
    loading?: boolean
    onClick?: () => void
    children: React.ReactNode
    className?: string
    type?: 'button' | 'submit' | 'reset'
    fullWidth?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    children,
    className = '',
    type = 'button',
    fullWidth = false,
    leftIcon,
    rightIcon
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-95'
    
    const variantClasses = {
        primary: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-300',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-sm hover:shadow-md focus:ring-gray-300',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-300',
        success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-300',
        outline: 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white focus:ring-green-300',
        ghost: 'text-green-600 hover:bg-green-50 focus:ring-green-300'
    }
    
    const sizeClasses = {
        xs: 'py-1.5 px-3 text-xs',
        sm: 'py-2 px-4 text-sm',
        md: 'py-2.5 px-5 text-base',
        lg: 'py-3 px-6 text-lg',
        xl: 'py-4 px-8 text-xl'
    }

    const disabledClasses = disabled || loading 
        ? 'opacity-50 cursor-not-allowed transform-none active:scale-100' 
        : 'hover:scale-105'

    const widthClasses = fullWidth ? 'w-full' : ''

    return (
        <button
            type={type}
            className={cn(
                baseClasses,
                variantClasses[variant],
                sizeClasses[size],
                disabledClasses,
                widthClasses,
                className
            )}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </>
            ) : (
                <>
                    {leftIcon && <span className="mr-2">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="ml-2">{rightIcon}</span>}
                </>
            )}
        </button>
    )
}
