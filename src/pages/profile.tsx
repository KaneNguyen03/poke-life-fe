import Loading from "@/components/ui/loading"
import { OrdersHistory } from "@/components/ui/order-history"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import orderApi from "@/services/order"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { FaSave, FaEdit, FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaShoppingBag } from "react-icons/fa"
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export const Profile = () => {
    const { user } = useAuth()
    const { t } = useTranslation()
    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState({
        Username: user?.Username || '',
        Email: user?.Email || '',
        Address: user?.Address || '',
        PhoneNumber: user?.PhoneNumber || ''
    })
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile')

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await orderApi.getAllOrderByCustomerID()
                setOrders(orders)
            } catch (error) {
                console.error("Error fetching orders:", error)
                toast.error('Failed to load order history')
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchOrders()
        }
    }, [user])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditedUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // TODO: Implement profile update API call
        toast.success('Profile updated successfully!')
        setIsEditing(false)
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                        <FaUser className="text-green-600 text-3xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {t('profile.title', { name: user?.Username })}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {t('profile.subtitle')}
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-xl p-2 shadow-lg">
                        <Button
                            onClick={() => setActiveTab('profile')}
                            variant={activeTab === 'profile' ? 'primary' : 'secondary'}
                            className={`mr-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                                activeTab === 'profile' 
                                    ? 'bg-green-500 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <FaUser className="mr-2" />
                            {t('profile.tabs.profile')}
                        </Button>
                        <Button
                            onClick={() => setActiveTab('orders')}
                            variant={activeTab === 'orders' ? 'primary' : 'secondary'}
                            className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                                activeTab === 'orders' 
                                    ? 'bg-green-500 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <FaShoppingBag className="mr-2" />
                            {t('profile.tabs.orders')} ({orders.length})
                        </Button>
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'profile' ? (
                    <div className="max-w-2xl mx-auto">
                        <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">
                                            {t('profile.personalInfo')}
                                        </h2>
                                        <p className="text-green-100">
                                            {t('profile.personalInfoDesc')}
                                        </p>
                                    </div>
                                    {!isEditing && (
                                        <Button
                                            onClick={() => setIsEditing(true)}
                                            variant="secondary"
                                            className="bg-white text-green-600 hover:bg-green-50"
                                        >
                                            <FaEdit className="mr-2" />
                                            {t('profile.edit')}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="p-8">
                                {isEditing ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    <FaUser className="inline mr-2 text-green-500" />
                                                    {t('profile.fields.name')}
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="Username"
                                                    value={editedUser.Username}
                                                    onChange={handleInputChange}
                                                    placeholder={t('profile.placeholders.name')}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    <FaEnvelope className="inline mr-2 text-green-500" />
                                                    {t('profile.fields.email')}
                                                </label>
                                                <Input
                                                    type="email"
                                                    name="Email"
                                                    value={editedUser.Email}
                                                    onChange={handleInputChange}
                                                    placeholder={t('profile.placeholders.email')}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    <FaPhone className="inline mr-2 text-green-500" />
                                                    {t('profile.fields.phone')}
                                                </label>
                                                <Input
                                                    type="tel"
                                                    name="PhoneNumber"
                                                    value={editedUser.PhoneNumber}
                                                    onChange={handleInputChange}
                                                    placeholder={t('profile.placeholders.phone')}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    <FaMapMarkerAlt className="inline mr-2 text-green-500" />
                                                    {t('profile.fields.address')}
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="Address"
                                                    value={editedUser.Address}
                                                    onChange={handleInputChange}
                                                    placeholder={t('profile.placeholders.address')}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-4 pt-6 border-t">
                                            <Button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                variant="secondary"
                                                className="px-6 py-3"
                                            >
                                                {t('common.cancel')}
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                className="px-6 py-3 bg-green-500 hover:bg-green-600"
                                            >
                                                <FaSave className="mr-2" />
                                                {t('profile.saveChanges')}
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center mb-2">
                                                    <FaUser className="text-green-500 mr-2" />
                                                    <span className="text-sm font-semibold text-gray-600">
                                                        {t('profile.fields.name')}
                                                    </span>
                                                </div>
                                                <p className="text-lg font-medium text-gray-900">
                                                    {user?.Username || t('profile.notProvided')}
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center mb-2">
                                                    <FaEnvelope className="text-green-500 mr-2" />
                                                    <span className="text-sm font-semibold text-gray-600">
                                                        {t('profile.fields.email')}
                                                    </span>
                                                </div>
                                                <p className="text-lg font-medium text-gray-900">
                                                    {user?.Email || t('profile.notProvided')}
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center mb-2">
                                                    <FaPhone className="text-green-500 mr-2" />
                                                    <span className="text-sm font-semibold text-gray-600">
                                                        {t('profile.fields.phone')}
                                                    </span>
                                                </div>
                                                <p className="text-lg font-medium text-gray-900">
                                                    {user?.PhoneNumber || t('profile.notProvided')}
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center mb-2">
                                                    <FaMapMarkerAlt className="text-green-500 mr-2" />
                                                    <span className="text-sm font-semibold text-gray-600">
                                                        {t('profile.fields.address')}
                                                    </span>
                                                </div>
                                                <p className="text-lg font-medium text-gray-900">
                                                    {user?.Address || t('profile.notProvided')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <OrdersHistory orders={orders} />
                    </div>
                )}
            </div>
        </div>
    )
}
