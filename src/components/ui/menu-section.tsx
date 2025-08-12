import React from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useFood } from '@/hooks/api/use-food'
import { useCart } from '@/hooks/ui/use-cart'
import { APIFoodResponse } from '@/types'
import { formatCurrency } from '@/utils/formatters'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { FaFire, FaLeaf, FaPlus } from 'react-icons/fa'


export const MenuSection: React.FC = () => {
    const { user } = useAuth()
    const { food, loading, error } = useFood()
    const { addItem } = useCart()
    const { t } = useTranslation()

    const handleAddToCart = (item: APIFoodResponse) => {
        addItem(item)
    }

    if (loading) {
        return (
            <section id="menu" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mb-4"></div>
                        <p className="text-gray-600 text-lg">{t('menu.loading')}</p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section id="menu" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-red-600 font-medium">{t('menu.error')}</p>
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="menu" className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                        <FaLeaf className="text-green-600 text-2xl" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('menu.title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('menu.subtitle')}
                    </p>
                    <div className="w-24 h-1 bg-green-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {food.map((item) => (
                        <Card 
                            key={item.FoodID} 
                            hover 
                            className="overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-2xl group"
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={item.Image}
                                    alt={item.Name}
                                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                                
                                {/* Calories Badge */}
                                <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                                    <FaFire className="text-orange-500 text-sm" />
                                    <span className="text-sm font-medium text-gray-700">
                                        {item.Calories} {t('menu.calories')}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {item.Name}
                                </h3>
                                
                                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                    {item.Description}
                                </p>

                                {/* Price and Action */}
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 uppercase tracking-wide">
                                            {t('menu.price')}
                                        </span>
                                        <span className="text-2xl font-bold text-green-600">
                                            {formatCurrency(item.Price)} VND
                                        </span>
                                    </div>

                                    <Button
                                        onClick={() => handleAddToCart(item)}
                                        variant="primary"
                                        className="flex items-center space-x-2 transition-all duration-200 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                                        aria-label={`${t('menu.addToCart')} ${item.Name}`}
                                    >
                                        <FaPlus className="text-sm" />
                                        <span className="font-medium">
                                            {t('menu.addToCart')}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Guest Cart Info */}
                {!user && (
                    <div className="text-center mt-16">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-lg mx-auto">
                            <p className="text-blue-800 font-medium mb-2">
                                {t('menu.guestCartInfo')}
                            </p>
                            <p className="text-blue-600 text-sm">
                                {t('menu.guestCartDescription')}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
