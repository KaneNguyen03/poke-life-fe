// renderChart.tsx
import { Statistic } from "@/types"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const formatVND = (value: number) => {
    if (value >= 1_000_000) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', notation: 'compact' }).format(value)
    }
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}
const defaultFormatter = (value: number) => value.toString()

export const renderChart = (statistic: Statistic | null, isMonthlyView: boolean) => {
    const chartData = isMonthlyView ? statistic?.viewLineChartByMonth ?? [] : statistic?.viewLineChart ?? []

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={isMonthlyView ? "day" : "name"} tick={{ fontSize: 12 }} />
                <YAxis width={100} tickFormatter={isMonthlyView ? formatVND : defaultFormatter} />
                <Tooltip formatter={(value: number) => isMonthlyView ? formatVND(value) : defaultFormatter(value)} />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                <Line type="monotone" dataKey="revenue" stroke="#ffc658" />
            </LineChart>
        </ResponsiveContainer>
    )
}
