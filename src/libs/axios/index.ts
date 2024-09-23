import authApi from '@/services/auth'
import axios from 'axios'

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
        if (refreshToken) {
          const response = await authApi.refreshToken(refreshToken)
          const newToken = response.data.token

          // Save the new token
          localStorage.setItem(TOKEN_KEY, newToken)

          // Update the authorization header and retry the original request
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return apiInstance(originalRequest)
        } else {
          throw new Error('Refresh token not found')
        }
      } catch (refreshError) {
        // If refreshing the token fails, log out the user
        logOutApp()
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
