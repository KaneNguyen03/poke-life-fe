import authApi from '@/services/auth'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const TOKEN_KEY = 'poke_token'
export const REFRESH_TOKEN_KEY = 'poke_refresh_token'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SECRET
})

apiInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh logic
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
        const accessToken = localStorage.getItem(TOKEN_KEY) || ''
        const token = jwtDecode(accessToken) as { sub: string }
        if (refreshToken) {
          const response = await authApi.refreshToken(token.sub, refreshToken) as { data: { access_token: string, refresh_token: string } }

          const newAccessToken = response.data.access_token
          const newRefreshToken = response.data.refresh_token
          // // Save the new token
          localStorage.setItem(TOKEN_KEY, newAccessToken)
          localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)

          // Update the authorization header and retry the original request
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return apiInstance(originalRequest)
        } else {
          throw new Error('Refresh token not found')
        }
      } catch (refreshError) {
        // If refreshing the token fails, log out the user
        // logOutApp()
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export const logOutApp = async () => {
  const resp = await authApi.logOut()
  if (resp) {
    localStorage.clear()
    window.location.reload()
  }
}

export default apiInstance
