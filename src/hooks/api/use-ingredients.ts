import { useEffect, useState } from 'react'
import ingredientApi from '@/services/ingredients'

interface Ingredient {
    IngredientID: string
    Name: string
    Calories: number
    Price: number
    CreatedAt: string
    UpdatedAt: string
    IsDeleted: boolean
}

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchIngredients = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await ingredientApi.getAllIngredient()
            setIngredients(data || [])
        } catch (err) {
            setError('Failed to fetch ingredients')
            console.error('Error fetching ingredients:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchIngredients()
    }, [])

    return {
        ingredients,
        loading,
        error,
        refetch: fetchIngredients
    }
}
