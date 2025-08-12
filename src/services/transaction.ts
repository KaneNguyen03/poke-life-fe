import apiInstance from "@/libs/axios"


const getStatistics = async () => {
    try {
        const response = await apiInstance.get(import.meta.env.VITE_STATISTICS_API)
        return response

    } catch (error) {
        console.error(error)
    }
}


const transactionApi = {
    getStatistics,
}

export default transactionApi