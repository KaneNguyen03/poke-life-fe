export const MetricCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-semibold mt-1">{value}</p>
            </div>
            <div className="text-blue-500">{icon}</div>
        </div>
    </div>
)
