// Dashboard.tsx
import { Button } from "antd"
import { FiCoffee, FiPieChart, FiShoppingCart, FiUsers } from "react-icons/fi"
import { MetricCard } from "@/layouts/layout-admin-ui/metric-card"
import { Statistic } from "@/types"
import { renderChart } from "@/components/ui/admin-component-layout/render-chart"

interface DashboardProps {
    statistic: Statistic | null
    isMonthlyView: boolean
    setIsMonthlyView: (isMonthly: boolean) => void
}

const Dashboard: React.FC<DashboardProps> = ({ statistic, isMonthlyView, setIsMonthlyView }) => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard title="Total Users" value={statistic?.totalCustomers?.toString() ?? ''} icon={<FiUsers />} />
                <MetricCard title="Pending Orders" value={statistic?.pendingOrders?.toString() ?? ''} icon={<FiShoppingCart />} />
                <MetricCard title="Finished Order" value={statistic?.finishedOrders?.toString() ?? ''} icon={<FiCoffee />} />
                <MetricCard title="Revenue" value={statistic?.totalRevenue?.toString() ?? ''} icon={<FiPieChart />} />
            </div>
            <div className="flex space-x-4 mb-4">
                <Button onClick={() => setIsMonthlyView(true)} type={isMonthlyView ? "primary" : "default"}>
                    Monthly View
                </Button>
                <Button onClick={() => setIsMonthlyView(false)} type={!isMonthlyView ? "primary" : "default"}>
                    Daily View
                </Button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">User, Order, and Revenue Trends</h3>
                {renderChart(statistic, isMonthlyView)} {/* Pass statistic and view type */}
            </div>
        </div>
    )
}

export default Dashboard
