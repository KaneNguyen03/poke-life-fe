import { useAuth } from '@/hooks/use-auth'
import ingredientApi from '@/services/ingredients'
import { AppDispatch, RootState } from '@/store'
import { addToCart } from '@/store/slice/cart-slice'
import { uuidv4 } from '@/utils/uuid'
import { MouseEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface Ingredient {
    IngredientID: string
    Name: string
    Description?: string
    Calories: number
    IngredientImage?: string
    Price: number
}

export default function CustomDishes() {
    const { user } = useAuth()
    const dispatch: AppDispatch = useDispatch()

    const cartItems = useSelector((state: RootState) => state.cart.items)

    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([])
    const [selectedIngredients, setSelectedIngredients] = useState<{ [key: string]: { name: string; quantity: number; price: number; calories: number; ingredientId: string } }>({})
    const [note, setNote] = useState<string>('')
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [customDishCreated, setCustomDishCreated] = useState<boolean>(false)
    const [confirmationPopup, setConfirmationPopup] = useState<boolean>(false)

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await ingredientApi.getAllIngredient()
                setIngredients(response)
                setFilteredIngredients(response)
            } catch (error) {
                console.error("Failed to fetch ingredients:", error)
            }
        }
        fetchIngredients()
    }, [])

    const handleIngredientChange = (ingredientId: string, name: string, quantity: number, price: number, calories: number) => {
        if (quantity > 0) {
            setSelectedIngredients(prev => ({
                ...prev,
                [ingredientId]: { name, quantity, price, calories, ingredientId },
            }))
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [ingredientId]: _, ...rest } = selectedIngredients
            setSelectedIngredients(rest)
        }
    }

    const handleConfirmSelection = () => {
        setModalOpen(false)
    }

    const handleCreateCustomDish = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (cartItems.some(item => item.Name === "Custom Dish")) {
            e.preventDefault()
            toast.error("Please remove the custom dishes in the shopping cart")
            return
        }
        if (!user) {
            return toast.warning("User not logged in. Please login to create custom dish.")
        }
        if (customDishCreated) {
            return toast.warning("You can only create one custom dish.")
        }
        setConfirmationPopup(true)
    }

    const confirmCreateCustomDish = () => {
        const customDish = {
            Ingredients: Object.values(selectedIngredients).map((ingredient: { name: string; quantity: number; ingredientId: string }) =>
                ({ Name: ingredient.name, Quantity: ingredient.quantity, IngredientID: ingredient.ingredientId })),
            Note: note,
            Name: "Custom Dish",
            Price: parseFloat(calculateTotalPrice()) ?? 0,
            FoodID: uuidv4(),
            quantity: 1,
            Image: "https://media.istockphoto.com/id/1395140920/photo/peach-blueberry-and-arugula-fresh-fruit-salad-with-cheese-and-almond-nuts-top-view.jpg?s=612x612&w=0&k=20&c=IrRb7_0bFeO5uD0tfBoJxTElJHQ372li_ODfPEd7Vdk="
        }

        dispatch(addToCart(customDish))
        setSelectedIngredients({})
        setNote('')
        setCustomDishCreated(true)
        setConfirmationPopup(false)
        toast.success("Custom dish has been added to your cart!", {
            position: "top-right",
            autoClose: 3000,
        })
    }

    const handleFilterIngredients = (query: string) => {
        const filtered = ingredients.filter(ingredient =>
            ingredient.Name.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredIngredients(filtered)
    }

    const calculateTotalPrice = () => {
        return Object.values(selectedIngredients).reduce((total, ingredient) => {
            return total + (ingredient.price * ingredient.quantity)
        }, 0).toFixed(2)
    }

    const calculateTotalCalories = () => {
        return Object.values(selectedIngredients).reduce((total, ingredient) => {
            return total + (ingredient.calories * ingredient.quantity)
        }, 0)
    }

    return (
        <section className="py-16 bg-green-50">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-5xl font-bold text-center mb-8 text-green-600">Customizable Meal Plans</h2>
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-green-500 text-white rounded-lg px-8 py-3 mt-4 shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
                >
                    Select Ingredients
                </button>

                <h3 className="text-2xl font-semibold mt-8 text-green-700">Chosen Ingredients:</h3>
                <div className="flex flex-wrap justify-start bg-white p-4 rounded-lg shadow-md">
                    {Object.entries(selectedIngredients).length > 0 ? (
                        Object.entries(selectedIngredients).map(([id, { name, quantity, calories }]) => (
                            <div key={id} className="flex items-center bg-green-100 border border-green-300 rounded-lg px-4 py-2 m-2 shadow-sm transition-transform duration-200 hover:scale-105">
                                <span className="text-lg text-green-800 font-medium">{name}</span>
                                <span className="ml-4 bg-green-200 text-green-800 rounded-full px-3 py-1">{quantity}</span>
                                <span className="ml-4 text-green-800">{calories * quantity} Calories</span>
                                <button
                                    className="ml-4 text-red-600 hover:text-red-800 transition duration-300"
                                    onClick={() => handleIngredientChange(id, name, 0, 0, calories)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No ingredients selected yet.</p>
                    )}
                </div>

                <div className="mt-4 text-xl font-semibold text-green-800">
                    Total Price: <span className="font-bold">${calculateTotalPrice()}</span>
                </div>
                <div className="mt-2 text-xl font-semibold text-green-800">
                    Total Calories: <span className="font-bold">{calculateTotalCalories()} kcal</span>
                </div>

                <div className="mt-6">
                    <textarea
                        placeholder="Add a note..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="border border-green-500 rounded-lg p-4 w-full h-32 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                    />
                </div>
                <button
                    onClick={(e) => handleCreateCustomDish(e as unknown as MouseEvent<HTMLButtonElement, MouseEvent>)}
                    className="mt-4 bg-green-500 text-white rounded-lg px-8 py-3 transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none shadow-lg transform hover:scale-105"
                >
                    Create Custom Dish
                </button>
            </div>

            {/* Modal for selecting ingredients */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg transition-transform transform scale-95 duration-300 ease-in-out">
                        <h3 className="text-2xl font-semibold mb-4">Select Ingredients</h3>
                        <input
                            type="text"
                            placeholder="Search for ingredients..."
                            className="border border-green-500 rounded-lg p-3 w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                            onChange={(e) => handleFilterIngredients(e.target.value)}
                        />
                        <div className="max-h-96 overflow-y-auto">
                            {filteredIngredients.map(ingredient => (
                                <div key={ingredient.IngredientID} className="flex items-center justify-between border-b border-gray-200 py-3">
                                    <div className="flex items-center">
                                        {ingredient.IngredientImage && (
                                            <img src={ingredient.IngredientImage} alt={ingredient.Name} className="w-16 h-16 rounded-full mr-4 shadow-md" />
                                        )}
                                        <div>
                                            <h4 className="text-lg font-medium text-green-700">{ingredient.Name}</h4>
                                            <p className="text-gray-600">{ingredient.Description}</p>
                                            <p className="text-green-600">Calories: {ingredient.Calories}</p>
                                            <p className="text-green-600">Price: ${ingredient.Price}</p>
                                        </div>
                                    </div>
                                    <input
                                        type="number"
                                        min="0"
                                        className="border border-green-500 rounded-lg p-2 w-16 text-center"
                                        onChange={(e) => handleIngredientChange(ingredient.IngredientID, ingredient.Name, parseInt(e.target.value) || 0, ingredient.Price, ingredient.Calories)}
                                        placeholder="Qty"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <button onClick={() => setModalOpen(false)} className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 transition duration-300">
                                Cancel
                            </button>
                            <button onClick={handleConfirmSelection} className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-300">
                                Confirm Selection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Popup */}
            {confirmationPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg transition-transform transform scale-95 duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold mb-4">Confirm Custom Dish Creation</h3>
                        <p className="mb-4">Are you sure you want to create this custom dish?</p>
                        <button
                            onClick={confirmCreateCustomDish}
                            className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-300 mr-2"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setConfirmationPopup(false)}
                            className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 transition duration-300"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}
