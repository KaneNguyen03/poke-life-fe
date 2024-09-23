export const OrderManagement = () => (
    <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Management</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample order data */}
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">#12345</td>
                        <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">$99.99</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-2">View</a>
                            <a href="#" className="text-green-600 hover:text-green-900">Process</a>
                        </td>
                    </tr>
                    {/* Add more order rows as needed */}
                </tbody>
            </table>
        </div>
    </div>
)