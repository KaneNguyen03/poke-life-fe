import React from 'react'

interface MetricCardProps {
    title: string
    value: string
    icon: React.ReactNode
    trend?: {
        value: number
        isPositive: boolean
    }
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
    title, 
    value, 
    icon, 
    trend 
}) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                {trend && (
                    <div className={`flex items-center mt-2 text-sm ${
                        trend.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                        <span className={`mr-1 ${
                            trend.isPositive ? '↗' : '↘'
                        }`}>
                            {trend.isPositive ? '↗' : '↘'}
                        </span>
                        <span className="font-medium">{Math.abs(trend.value)}%</span>
                        <span className="text-gray-500 ml-1">vs last month</span>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-lg text-indigo-600">
                {icon}
            </div>
        </div>
    </div>
)
