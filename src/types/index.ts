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
    id: number
    fullName: string
    email: string
    dob: string
    address: string
    gender: string
    phone: string
    username: string
    role: string
    profilePic: string
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

