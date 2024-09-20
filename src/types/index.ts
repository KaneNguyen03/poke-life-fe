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
