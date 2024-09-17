export default function Menu() {
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

    const RecipeCard = ({ title, image, time, difficulty }: { title: string, image: string, time: string, difficulty: string }) => {
        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>{time}</span>
                        <span>{difficulty}</span>
                    </div>
                    <div className="flex justify-end p-2 mt-2">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">Order</button>
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
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={index} {...recipe} />
                    ))}
                </div>
            </div>
        </section>
    )
}
