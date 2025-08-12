import { useEffect, useState } from 'react'
import transactionApi from '@/services/transaction'
import { Statistic } from '@/types'

export const useAdminData = () => {
    const [statistic, setStatistic] = useState<Statistic | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchStatistic = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await transactionApi.getStatistics()
            if (response) {
                setStatistic(response.data)
            }
        } catch (err) {
            setError('Failed to fetch statistics')
            console.error("Failed to fetch statistic", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStatistic()
    }, [])

    return {
        statistic,
        loading,
        error,
        refetch: fetchStatistic
    }
}
