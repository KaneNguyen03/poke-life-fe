export default function CustomDishes() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Customizable Meal Plans</h2>
                <div className="flex flex-wrap justify-center">
                    <div className="bg-green-100 rounded-lg p-6 text-center max-w-sm">
                        <h3 className="text-xl font-semibold mb-4">Custom dish</h3>
                        <p className="mb-4">Delicious plant-based meals for a healthy lifestyle</p>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                            View Plan
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
