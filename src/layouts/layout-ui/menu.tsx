import foodApi from "@/services/food"
import { APIFoodResponse } from "@/types"
import { useEffect, useState } from "react"

export default function Menu() {
    const [food, setFood] = useState<APIFoodResponse>()


    const recipes = [
        {
            title: "Quinoa Salad Bowl",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            time: "20 mins",
            difficulty: "Easy"
        },
        {
            title: "Grilled Salmon",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
            time: "30 mins",
            difficulty: "Medium"
        },
        {
            title: "Avocado Toast",
            image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80",
            time: "10 mins",
            difficulty: "Easy"
        },
        {
            title: "Green Smoothie",
            image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
            time: "5 mins",
            difficulty: "Easy"
        }
    ]

    const fetchFood = async () => {
        const food = await foodApi.getAllFood()
        setFood(food)
    }

    useEffect(() => {
        fetchFood()
    }, [])

    const RecipeCard = ({ Name, Image, Description, Calories }: { Name: string, Image: string, Description: string, Calories: number }) => {
        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 h-96">
                <img src={Image} alt={Name} className="w-full h-1/2 object-cover" />
                <div className="p-4 h-1/2 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">{Name}</h3>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{Description}</span>
                            <span>{Calories} calories</span>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Order
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="py-16 bg-green-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Recipes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {food?.map((item, index) => (
                        <RecipeCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}
