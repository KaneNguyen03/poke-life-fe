import { useEffect, useState } from 'react'
import foodApi from '@/services/food'
import { APIFoodResponse } from '@/types'

export const useFood = () => {
    const [food, setFood] = useState<APIFoodResponse[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchFood = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await foodApi.getAllFood()
            setFood(data || [])
        } catch (err) {
            setError('Failed to fetch food items')
            console.error('Error fetching food:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFood()
    }, [])

    return {
        food,
        loading,
        error,
        refetch: fetchFood
    }
}
