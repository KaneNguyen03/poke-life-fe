import React from 'react'

interface CardProps {
    children: React.ReactNode
    className?: string
    padding?: 'sm' | 'md' | 'lg'
    shadow?: boolean
    hover?: boolean
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'md',
    shadow = true,
    hover = false
}) => {
    const baseClasses = 'bg-white rounded-lg border'
    
    const paddingClasses = {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6'
    }
    
    const shadowClasses = shadow ? 'shadow-md' : ''
    const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200' : ''

    return (
        <div className={`${baseClasses} ${paddingClasses[padding]} ${shadowClasses} ${hoverClasses} ${className}`}>
            {children}
        </div>
    )
}
