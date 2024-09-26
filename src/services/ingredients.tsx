import apiInstance from "@/libs/axios"

const getAllIngredient = async () => {
    try {
        const response = await apiInstance.get(import.meta.env.VITE_INGREDIENT_API)
        const data = response.data
        return data

    } catch (error) {
        console.error(error)
    }
}

const getIngredientByFoodId = async (foodID: string) => {
    try {
        const response = await apiInstance.get(`${import.meta.env.VITE_INGREDIENT_API}/${foodID}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const ingredientApi = {
    getAllIngredient,
    getIngredientByFoodId
}

export default ingredientApi