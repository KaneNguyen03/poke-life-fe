import ingredientApi from '@/services/ingredients'
import { useEffect, useState } from 'react'

interface Ingredient {
    IngredientID: string
    Name: string
    Description?: string
    Calories: number
    IngredientImage?: string
    Price: number
}

export default function CustomDishes() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([])
    const [selectedIngredients, setSelectedIngredients] = useState<{ [key: string]: { name: string; quantity: number } }>({})
    const [note, setNote] = useState<string>('')
    const [modalOpen, setModalOpen] = useState<boolean>(false)

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

    const handleIngredientChange = (ingredientId: string, name: string, quantity: number) => {
        if (quantity > 0) {
            setSelectedIngredients(prev => ({
                ...prev,
                [ingredientId]: { name, quantity },
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

    const handleCreateCustomDish = () => {
        const customDish = {
            ingredients: Object.values(selectedIngredients),
            note: note,
        }
        console.log("Custom Dish Created: ", customDish)
        setSelectedIngredients({})
        setNote('')
    }

    const handleFilterIngredients = (query: string) => {
        const filtered = ingredients.filter(ingredient =>
            ingredient.Name.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredIngredients(filtered)
    }

    return (
        <section className="py-16 bg-green-50">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-4xl font-bold text-center mb-8 text-green-600">Customizable Meal Plans</h2>
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-green-500 text-white rounded-lg px-8 py-3 mt-4 shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
                >
                    Select Ingredients
                </button>

                <h3 className="text-2xl font-semibold mt-8">Chosen Ingredients:</h3>
                <div className="flex flex-wrap justify-start bg-white p-4 rounded-lg shadow-md">
                    {Object.entries(selectedIngredients).length > 0 ? (
                        Object.entries(selectedIngredients).map(([id, { name, quantity }]) => (
                            <div key={id} className="flex items-center bg-green-100 border border-green-300 rounded-lg px-4 py-2 m-2">
                                <span className="text-lg text-green-800">{name}</span>
                                <span className="ml-4 bg-green-200 text-green-800 rounded-full px-3 py-1">{quantity}</span>
                                <button
                                    className="ml-4 text-red-600 hover:text-red-800 transition duration-300"
                                    onClick={() => handleIngredientChange(id, name, 0)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No ingredients selected yet.</p>
                    )}
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
                    onClick={handleCreateCustomDish}
                    className="mt-4 bg-green-500 text-white rounded-lg px-8 py-3 transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none shadow-lg transform hover:scale-105"
                >
                    Create Custom Dish
                </button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg transition-transform transform scale-95 duration-300 ease-in-out" style={{ transform: modalOpen ? 'scale(1)' : 'scale(0.95)' }}>
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
                                            <img src={ingredient.IngredientImage} alt={ingredient.Name} className="w-16 h-16 rounded-full mr-4" />
                                        )}
                                        <div>
                                            <h4 className="text-lg font-medium">{ingredient.Name}</h4>
                                            <p className="text-gray-600">{ingredient.Description}</p>
                                            <p className="text-gray-500">${ingredient.Price}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Qty"
                                            className="border border-green-500 rounded-lg p-2 w-24 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                                            onChange={e => handleIngredientChange(ingredient.IngredientID, ingredient.Name, Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-gray-300 rounded-lg px-4 py-2 mr-2 transition duration-300 hover:bg-gray-400 transform hover:scale-105"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmSelection}
                                className="bg-green-500 text-white rounded-lg px-4 py-2 transition duration-300 hover:bg-green-600 transform hover:scale-105"
                            >
                                Confirm Selection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
