import apiInstance from "@/libs/axios"
import { APICustomFoodRequest, APIFoodResponse } from "@/types"

const getAllFood = async (pageIndex = 1, pageSize = 10, keyword = '') => {
    try {
        const response = await apiInstance.get<APIFoodResponse[]>(import.meta.env.VITE_FOOD_API, {
            params: {
                pageIndex,
                pageSize,
                keyword
            }
        })
        const data = response.data
        return data

    } catch (error) {
        console.error(error)
    }
}

const createCustomFood = async (food: APICustomFoodRequest) => {
    try {
        const response = await apiInstance.post<APIFoodResponse>(import.meta.env.VITE_FOOD_API + "/customDish", food)
        const data = response.data
        return data
    } catch (error) {
        console.error(error)
    }
}

const foodApi = {
    getAllFood,
    createCustomFood
}

export default foodApi