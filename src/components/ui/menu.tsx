import foodApi from "@/services/food"
import { addToCart } from "@/store/slice/cart-slice"
import { APIFoodResponse } from "@/types"
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import { useTranslation } from 'react-i18next'
import { FaPlus, FaFire, FaLeaf, FaHeart, FaStar, FaSearch } from "react-icons/fa"

export default function Menu() {
    const { t } = useTranslation()
    const [food, setFood] = useState<APIFoodResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()

    const fetchFood = async () => {
        try {
            setLoading(true)
            const food = await foodApi.getAllFood()
            setFood(food || [])
        } catch (error) {
            toast.error("Failed to load menu items")
        } finally {
            setLoading(false)
        }
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
        toast.success(`${item.Name} ${t('menu.addedToCart')}`, {
            position: "top-right",
            autoClose: 2000,
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    const categories = [
        { id: 'all', name: 'All Items', icon: FaLeaf },
        { id: 'healthy', name: 'Healthy', icon: FaHeart },
        { id: 'popular', name: 'Popular', icon: FaFire },
        { id: 'vegetarian', name: 'Vegetarian', icon: FaLeaf },
    ]

    const filteredFood = food?.filter(item => {
        const matchesSearch = item.Name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || true // For now, show all items
        return matchesSearch && matchesCategory && item.Name !== "Custom Dish"
    })

    const MenuCard = ({ Name, Image, Description, Calories, Price, FoodID }: APIFoodResponse) => {
        return (
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                    <img 
                        src={Image} 
                        alt={Name} 
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <FaStar className="text-yellow-400 text-sm mr-1" />
                            <span className="text-sm font-semibold text-gray-900">4.8</span>
                        </div>
                    </div>

                    {/* Calories Badge */}
                    <div className="absolute top-4 right-4">
                        <div className="bg-green-500/90 backdrop-blur-sm text-white rounded-full px-3 py-1">
                            <span className="text-xs font-semibold">{Calories} cal</span>
                        </div>
                    </div>

                    {/* Quick Add Button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <button
                            onClick={() => handleAddToCart({
                                Name, Image, Description, Calories, Price, FoodID,
                                CreatedAt: "", UpdatedAt: ""
                            })}
                            className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
                            aria-label={`Add ${Name} to cart`}
                        >
                            <FaPlus className="text-sm" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-1">
                            {Name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {Description}
                        </p>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(Price)}
                        </div>
                        <button
                            onClick={() => handleAddToCart({
                                Name, Image, Description, Calories, Price, FoodID,
                                CreatedAt: "", UpdatedAt: ""
                            })}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                        >
                            <FaPlus className="text-sm" />
                            <span>{t('menu.addToCart')}</span>
                        </button>
                    </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
        )
    }

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        <p className="mt-4 text-gray-600">{t('menu.loading')}</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="menu" className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                            {t('menu.title')}
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-6" />
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('menu.subtitle')}
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-12">
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto mb-8">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search menu items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 bg-white shadow-lg"
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => {
                            const IconComponent = category.icon
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                        selectedCategory === category.id
                                            ? 'bg-green-600 text-white shadow-lg transform scale-105'
                                            : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md'
                                    }`}
                                >
                                    <IconComponent className="text-sm" />
                                    <span>{category.name}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {filteredFood?.map((item, index) => (
                        <MenuCard key={index} {...item} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredFood?.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-500 mb-2">No items found</p>
                        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </section>
    )
}
