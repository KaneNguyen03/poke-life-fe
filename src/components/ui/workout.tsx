export const WorkoutSection = () => {
    return (
        <section className="py-16 bg-green-50">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-center mb-8 text-green-600">Stay Active with Our Workouts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Yoga" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Yoga for Beginners</h3>
                            <p className="text-gray-600 mb-4">Start your day with a relaxing yoga session</p>
                            <a href="https://www.youtube.com/watch?v=v7AYKMP6rOE" target="_blank" rel="noopener noreferrer">
                                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                                    Watch Video
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1434596922112-19c563067271?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Running" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">30-Minute HIIT</h3>
                            <p className="text-gray-600 mb-4">Burn calories with this high-intensity workout</p>
                            <a href="https://www.youtube.com/watch?v=ml6cT4AZdqI" target="_blank" rel="noopener noreferrer">
                                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                                    Watch Video
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" alt="Strength Training" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Strength Training</h3>
                            <p className="text-gray-600 mb-4">Build muscle with our strength training routine</p>
                            <a href="https://www.youtube.com/watch?v=0hYDDsRjwks" target="_blank" rel="noopener noreferrer">
                                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                                    Watch Video
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
