import apiInstance from '@/libs/axios'
import { GetCurrentUserAPIResponse, Token } from '@/types'

const signIn = async (email: string, password: string): Promise<Token> => {
  try {
    const { data } = await apiInstance.post<Token>(import.meta.env.VITE_SIGNIN_API, {
      email,
      password
    })
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Invalid email or password')
  }
}
const signUp = async ({ email, password, address, phone, username }: {
  email: string, password: string
  address: string, phone: string, username: string
}): Promise<Token> => {
  try {
    const { data } = await apiInstance.post<Token>(import.meta.env.VITE_SIGNUP_API,
      { email, password, address, phoneNumber: phone, username }
    )
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Invalid signup data')
  }
}

const logOut = async () => {
  try {
    const resp = await apiInstance.post(import.meta.env.VITE_LOGOUT_API)
    return resp.data
  } catch {
    return { error: true }
  }
}

const refreshToken = async (refreshToken: string) => {
  try {
    const resp = await apiInstance.post(import.meta.env.VITE_REFRESH_API, {
      refreshToken: refreshToken
    })
    return resp.data
  } catch (e) {
    return e
  }
}

const getCurrentUser = async () => {
  try {
    const { data } = await apiInstance.get<GetCurrentUserAPIResponse>(import.meta.env.VITE_CURRENT_USER_API)
    return data
  } catch {
    return null
  }
}

const authApi = {
  signIn,
  logOut,
  refreshToken,
  getCurrentUser,
  signUp
}

export default authApi
