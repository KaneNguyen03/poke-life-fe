export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
                    alt="Healthy Food"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative z-10 text-center text-white">
                <h2 className="text-5xl font-bold mb-4">Eat Clean, Live Better</h2>
                <p className="text-xl mb-8">Discover delicious recipes and healthy living tips</p>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                    Get Started
                </button>
            </div>
        </section>
    )
}

