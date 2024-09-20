import foodApi from "@/services/food"
import { addToCart } from "@/store/slice/cart-slice"
import { APIFoodResponse } from "@/types"
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify"

export default function Menu() {
    const [food, setFood] = useState<APIFoodResponse[]>([])
    const dispatch = useDispatch()

    const fetchFood = async () => {
        const food = await foodApi.getAllFood()
        setFood(food || [])
    }

    useEffect(() => {
        fetchFood()
    }, [])

    interface CartItem extends APIFoodResponse {
        quantity: number
    }

    const handleAddToCart = (item: APIFoodResponse) => {
        const cartItem: CartItem = { ...item, quantity: 1 }
        dispatch(addToCart(cartItem))
        toast.success(`${item.Name} has been added to your cart!`, {
            position: "top-right",
            autoClose: 3000,
        })
    }

    const MenuCard = ({ Name, Image, Description, Calories, Price, FoodID }: { Name: string, Image: string, Description: string, Calories: number, Price: number, FoodID: string }) => {
        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 h-96">
                <img src={Image} alt={Name} className="w-full h-1/2 object-cover" />
                <div className="p-4 h-1/2 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">{Name}</h3>
                        <div className="flex justify-between text-sm text-gray-600 gap-8">
                            <span>{Description}</span>
                            <span>{Calories} calories</span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 p-2">
                        <div className="text-lg font-bold mt-2">{Price} USD</div>
                        <button onClick={() => handleAddToCart({
                            Name, Image, Description, Calories, Price,
                            FoodID,
                            CreatedAt: "",
                            UpdatedAt: ""
                        })} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
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
                        <MenuCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}
