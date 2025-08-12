import { useState, ChangeEvent } from 'react'

export const useForm = <T extends Record<string, unknown>>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const reset = () => setValues(initialValues)

    const setValue = (name: keyof T, value: T[keyof T]) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return {
        values,
        handleChange,
        reset,
        setValue
    }
}
