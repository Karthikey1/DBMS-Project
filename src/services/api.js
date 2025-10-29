import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message)
      throw new Error('Network error: Unable to connect to server')
    }
    
    return Promise.reject(error)
  }
)

export default api