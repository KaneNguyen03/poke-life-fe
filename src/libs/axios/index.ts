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

export const logOutApp = async () => {
  const resp = await authApi.logOut()
  if (resp.msg === 'logout') {
    localStorage.clear()
    window.location.reload()
  }
}

export default apiInstance
