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


const ingredientApi = {
    getAllIngredient,
}

export default ingredientApi