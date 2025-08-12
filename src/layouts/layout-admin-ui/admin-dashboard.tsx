// Dashboard.tsx
import { Button } from "@/components/ui/button"
import { FiCoffee, FiPieChart, FiShoppingCart, FiUsers, FiTrendingUp } from "react-icons/fi"
import { MetricCard } from "@/layouts/layout-admin-ui/metric-card"
import { Statistic } from "@/types"
import { renderChart } from "@/components/ui/admin-component-layout/render-chart"
import { formatCurrency } from "@/utils/formatters"

interface DashboardProps {
    statistic: Statistic | null
    isMonthlyView: boolean
    setIsMonthlyView: (isMonthly: boolean) => void
}

const Dashboard: React.FC<DashboardProps> = ({ statistic, isMonthlyView, setIsMonthlyView }) => {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
                    <p className="text-gray-600 mt-1">Monitor your restaurant's performance and key metrics</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <FiTrendingUp className="text-green-500" size={20} />
                    <span className="text-sm text-gray-600">Real-time data</span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                    title="Total Users" 
                    value={statistic?.totalCustomers?.toString() ?? '0'} 
                    icon={<FiUsers size={24} />}
                    trend={{ value: 12, isPositive: true }}
                />
                <MetricCard 
                    title="Pending Orders" 
                    value={statistic?.pendingOrders?.toString() ?? '0'} 
                    icon={<FiShoppingCart size={24} />}
                    trend={{ value: 5, isPositive: false }}
                />
                <MetricCard 
                    title="Completed Orders" 
                    value={statistic?.finishedOrders?.toString() ?? '0'} 
                    icon={<FiCoffee size={24} />}
                    trend={{ value: 8, isPositive: true }}
                />
                <MetricCard 
                    title="Total Revenue" 
                    value={formatCurrency(parseFloat(statistic?.totalRevenue?.toString() || '0'))} 
                    icon={<FiPieChart size={24} />}
                    trend={{ value: 15, isPositive: true }}
                />
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Analytics Overview</h3>
                            <p className="text-gray-600 mt-1">Track user engagement, orders, and revenue trends</p>
                        </div>
                        <div className="flex space-x-2 mt-4 sm:mt-0">
                            <Button 
                                onClick={() => setIsMonthlyView(true)} 
                                variant={isMonthlyView ? "primary" : "outline"}
                                size="sm"
                                className="text-sm"
                            >
                                Daily View
                            </Button>
                            <Button 
                                onClick={() => setIsMonthlyView(false)} 
                                variant={!isMonthlyView ? "primary" : "outline"}
                                size="sm"
                                className="text-sm"
                            >
                                Monthly View
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    {renderChart(statistic, isMonthlyView)}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
