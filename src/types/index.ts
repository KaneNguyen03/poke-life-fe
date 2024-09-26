export type LoginUserAPIResponse = {
    message: string
    httpStatus: string
    timeStamp: Date
    data: Token
}

export type Token = {
    access_token: string
    refresh_token: string
}

export type GetCurrentUserAPIResponse = {
    message: string
    httpStatus: string
    timeStamp: Date
    data: AuthUser
}

export type AuthUser = {
    UserID: number
    Email: string
    Address: string
    PhoneNumber: string
    Username: string
    Role: string
    IsDeleted: boolean
}

export type AuthContextType = {
    user: AuthUser | null
    submitting: boolean
    loadingInitial: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
    login: ({ email, password }: { email: string, password: string }) => Promise<Token>
    signup: ({ email, password, address, phone, username }: {
        email: string, password: string
        address: string, phone: string, username: string
    }) => Promise<Token>
    logout: () => Promise<void>
}

export type APIFoodResponse = {
    FoodID: string,
    Name: string,
    Image: string,
    Description: string,
    Price: number,
    Calories: number,
    CreatedAt: string,
    UpdatedAt: string
}

export type APICreateOrderRequest = {
    customerName: string,
    phoneNumber: string,
    address: string,
    paymentMethod: string,
    orderDetails: OrderDetailRequest[]
}

export type OrderDetailRequest = {
    foodID: string,
    quantity: number
}

export interface OrdersState {
    loading: boolean
    orders: Order[]
    pagination: Pagination | null
}

export interface Order {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    status: number
    OrderID: string
    CustomerID: string
    CustomerName: string
    PhoneNumber: string
    Address: string
    TotalPrice: string
    OrderStatus: string
    CreatedAt: string
    UpdatedAt: string
    IsDeleted: boolean
    paymentMethod: string
}

export interface Pagination {
    pageIndex: number
    pageSize: number
    totalPages: number
}

export type APIUpdateOrderRequest = {
    orderStatus: string,
    customerName: string,
    phoneNumber: string,
    address: string,
    paymentMethod: string
    total?: string
    phone?: string
}

export interface Food {
    FoodID: string
    Name: string
    Description: string
    Price: string
    Calories: number
    Image: string
    CreatedAt: string
    UpdatedAt: string
    IsDeleted: boolean
}

export interface Statistic {
    totalCustomers: number
    pendingOrders: number
    finishedOrders: number
    totalRevenue: number
    mostPopularFood: Food | null
    viewLineChartByMonth: DailyData[]
    viewLineChart: DailyData[] // Add this field for daily data
}

export interface DailyData {
    day: number
    users: number
    orders: number
    revenue: number // Revenue for the day
}