import apiInstance from "@/libs/axios"
import { APIFoodResponse } from "@/types"

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

const foodApi = {
    getAllFood
}

export default foodApi