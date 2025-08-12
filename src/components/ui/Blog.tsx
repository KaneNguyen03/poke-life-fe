import { useTranslation } from 'react-i18next'
import { FaCalendar, FaClock, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'

const blogs = [
    {
        id: 1,
        titleKey: "blog.posts.cleanEating.title",
        descriptionKey: "blog.posts.cleanEating.description",
        url: "https://www.rootsfoodgroup.com/blog/the-benefits-of-clean-eating",
        imageUrl: "https://cdn.prod.website-files.com/65a15b62eec3b94653990bc3/65e8947785fa679c6fbd696f_The%20Benefits%20of%20Clean%20Eating%203.webp",
        date: "2024-01-15",
        readTime: 8,
        category: "health"
    },
    {
        id: 2,
        titleKey: "blog.posts.recipes.title",
        descriptionKey: "blog.posts.recipes.description",
        url: "https://cleananddelicious.com/ground-turkey-butternut-squash-chili-one-pot/",
        imageUrl: "https://cleananddelicious.com/wp-content/uploads/2022/01/turkey_butternut_squash_chili.1.jpg",
        date: "2024-01-20",
        readTime: 5,
        category: "recipes"
    },
    {
        id: 3,
        titleKey: "blog.posts.sustainable.title",
        descriptionKey: "blog.posts.sustainable.description",
        url: "https://onetreeplanted.org/blogs/stories/9-tips-sustainable-eating",
        imageUrl: "https://onetreeplanted.org/cdn/shop/articles/green_salad_vegetarian_diet_2000x.jpg?v=1606336198",
        date: "2024-01-25",
        readTime: 12,
        category: "lifestyle"
    },
]

const Blog = () => {
    const { t } = useTranslation()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    }

    const getCategoryColor = (category: string) => {
        const colors = {
            health: 'bg-green-100 text-green-800',
            recipes: 'bg-orange-100 text-orange-800',
            lifestyle: 'bg-blue-100 text-blue-800'
        }
        return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    }

    return (
        <section id="blog" className="py-20 bg-gradient-to-b from-green-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                            {t('blog.title')}
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-6" />
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('blog.subtitle')}
                    </p>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {blogs.map((blog) => (
                        <article 
                            key={blog.id} 
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                        >
                            {/* Blog Image */}
                            <div className="relative overflow-hidden">
                                <img 
                                    src={blog.imageUrl} 
                                    alt={t(blog.titleKey)} 
                                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(blog.category)}`}>
                                        {t(`blog.categories.${blog.category}`)}
                                    </span>
                                </div>

                                {/* External Link Icon */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <FaExternalLinkAlt className="text-green-600 text-xs" />
                                    </div>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="p-6">
                                {/* Meta Information */}
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                    <FaCalendar className="mr-2" />
                                    <span className="mr-4">{formatDate(blog.date)}</span>
                                    <FaClock className="mr-2" />
                                    <span>{blog.readTime} {t('blog.minRead')}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                                    {t(blog.titleKey)}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                                    {t(blog.descriptionKey)}
                                </p>

                                {/* Read More Button */}
                                <a
                                    href={blog.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-300"
                                >
                                    <span className="mr-2">{t('blog.readMore')}</span>
                                    <FaArrowRight className="text-sm transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        </article>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Blog
