import apiInstance from "@/libs/axios"
import { APICreateOrderRequest, APIUpdateOrderRequest } from "@/types"


const getAllOrderByCustomerID = async () => {
    try {
        const response = await apiInstance.get(import.meta.env.VITE_ORDERS_BY_ID_API)
        const data = response.data
        return data

    } catch (error) {
        console.error(error)
    }
}

const getAllOrder = async (pageIndex = 1, pageSize = 10, keyword = '') => {
    try {
        const response = await apiInstance.get(import.meta.env.VITE_ORDERS_API, {
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

const updateOrder = async (id: string, updatedData: APIUpdateOrderRequest) => {
    try {
        const response = await apiInstance.patch(`${import.meta.env.VITE_ORDERS_API}/${id}`, updatedData)
        const data = response.data
        return data

    } catch (error) {
        return error
    }
}

const orderApi = {
    getAllOrderByCustomerID,
    getAllOrder,
    createOrder,
    updateOrder
}

export default orderApi