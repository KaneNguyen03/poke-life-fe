export const FoodManagement = () => (
    <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Food Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample food items */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                    className="w-full h-48 object-cover"
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                    alt="Food item"
                />
                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Healthy Salad</h3>
                    <p className="text-gray-600">Fresh vegetables with vinaigrette</p>
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-gray-800 font-bold">$12.99</span>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
                    </div>
                </div>
            </div>
            {/* Add more food items as needed */}
        </div>
    </div>
)