import apiInstance from "@/libs/axios"
import { APICreateOrderRequest, APIFoodResponse } from "@/types"

const getAllOrderByCustomerID = async () => {
    try {
        const response = await apiInstance.get(import.meta.env.VITE_ORDERS_BY_ID_API)
        const data = response.data
        return data

    } catch (error) {
        console.error(error)
    }
}

const getAllOrder = async () => {
    try {
        const response = await apiInstance.get(import.meta.env.VITE_ORDERS_API)
        const data = response.data
        return data

    } catch (error) {
        console.error(error)
    }
}

const createOrder = async (data: APICreateOrderRequest) => {
    try {
        const response = await apiInstance.post(import.meta.env.VITE_ORDERS_API,
            data
        )
        return response

    } catch (error) {
        console.error(error)
    }
}

const updateOrder = async () => {
    try {
        const response = await apiInstance.get<APIFoodResponse[]>(import.meta.env.VITE_ORDERS_API)
        const data = response.data
        return data

    } catch (error) {
        console.error(error)
    }
}

const orderApi = {
    getAllOrderByCustomerID,
    getAllOrder,
    createOrder,
    updateOrder
}

export default orderApi