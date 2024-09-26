const blogs = [
    {
        title: "The Benefits of Clean Eating",
        description: "Explore the numerous health benefits of adopting a clean eating lifestyle, including improved energy levels, better digestion, and weight management.",
        url: "https://www.rootsfoodgroup.com/blog/the-benefits-of-clean-eating", // Specific blog URL
        imageUrl: "https://cdn.prod.website-files.com/65a15b62eec3b94653990bc3/65e8947785fa679c6fbd696f_The%20Benefits%20of%20Clean%20Eating%203.webp", // Specific image URL
    },
    {
        title: "Delicious Clean Eating Recipes",
        description: "Discover a collection of mouth-watering clean eating recipes that are easy to prepare and packed with nutrients. Perfect for any meal of the day!",
        url: "https://cleananddelicious.com/ground-turkey-butternut-squash-chili-one-pot/", // Specific blog URL
        imageUrl: "https://cleananddelicious.com/wp-content/uploads/2022/01/turkey_butternut_squash_chili.1.jpg", // Specific image URL
    },
    {
        title: "Tips for Sustainable Clean Eating",
        description: "Learn how to maintain a sustainable clean eating routine, including tips for grocery shopping, meal prepping, and staying motivated.",
        url: "https://onetreeplanted.org/blogs/stories/9-tips-sustainable-eating", // Specific blog URL
        imageUrl: "https://onetreeplanted.org/cdn/shop/articles/green_salad_vegetarian_diet_2000x.jpg?v=1606336198", // Specific image URL
    },
]

const Blog = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 bg-green-50">
            <h2 className="text-5xl font-bold text-center mb-4 text-green-600">Eat Clean Blog</h2>
            <p className="text-xl text-center mb-8 text-gray-700 max-w-2xl">
                Discover more about clean eating, recipes, and health tips in our blog. Stay informed and inspired to live a healthier lifestyle!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-screen-xl px-4">
                {blogs.map((blog, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 p-6">
                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-56 object-cover mb-4" />
                        <h3 className="text-3xl font-semibold text-green-600 mb-2">{blog.title}</h3>
                        <p className="text-gray-600 mb-4">{blog.description}</p>
                        <a
                            href={blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white rounded-lg px-6 py-3 hover:bg-green-700 transition duration-300"
                        >
                            Read More
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blog
