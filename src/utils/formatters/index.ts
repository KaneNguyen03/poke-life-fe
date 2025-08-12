import numeral from 'numeral'

export const formatCurrency = (amount: number): string => {
    return numeral(amount).format('0,0')
}

export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString()
}

export const formatDateTime = (date: string): string => {
    return new Date(date).toLocaleString()
}

export const capitalizeFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).replace("-", " ")
}
