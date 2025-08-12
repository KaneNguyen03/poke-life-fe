import foodApi from "@/services/food" // Import your API service
import { APIFoodResponse } from "@/types" // Make sure this type includes all relevant food properties
import { formatCurrency } from "@/utils/formatters"
import { useEffect, useState } from "react"

export const FoodManagement = () => {
    const [foodItems, setFoodItems] = useState<APIFoodResponse[]>([])
    // const [isEditing, setIsEditing] = useState(false)
    // const [editFoodItem, setEditFoodItem] = useState<APIFoodResponse | null>(null)

    // Fetch food items from the API
    const fetchFoodItems = async () => {
        const items = await foodApi.getAllFood()
        const subFoodItems = items ? items.filter(x => x.Name !== "Custom Dish") : []
        setFoodItems(subFoodItems)
    }

    useEffect(() => {
        fetchFoodItems()
    }, [])


    // const handleEditFood = async (item: APIFoodResponse) => {
    //     // setEditFoodItem(item)
    //     // setIsEditing(true)
    // }

    // const handleDeleteFood = async (id: string) => {
    //     try {
    //         await foodApi.deleteFood(id) // Implement deleteFood in your API
    //         toast.success("Food item has been deleted!")
    //         fetchFoodItems()
    //     } catch (error) {
    //         toast.error("Failed to delete food item.")
    //     }
    // }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Food Management</h2>
            {/* Food items list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodItems.map((item) => (
                    <div key={item.FoodID} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            className="w-full h-48 object-cover"
                            src={item.Image}
                            alt={item.Name}
                        />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{item.Name}</h3>
                            <p className="text-gray-600">{item.Description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-gray-800 font-bold">{formatCurrency(item.Price)} VND</span>
                                {/* <div className="flex space-x-2">
                                    <button
                                        // onClick={() => handleEditFood(item)} 
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
                                    <button onClick={
                                        // () => handleDeleteFood(item.FoodID)
                                        () => { return null }
                                    } className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
