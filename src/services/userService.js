import api from './api'

export const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get('/user')
      return response.data
    } catch (error) {
      // For demo purposes, return mock data if backend not available
      console.warn('Backend not available, using mock data:', error.message)
      return [
        {
          user_id: 1,
          uname: 'John Doe',
          email: 'john@example.com',
          home_town: 'New York',
          birth_date: '1990-01-01',
          phone_numbers: '+1234567890'
        },
        {
          user_id: 2,
          uname: 'Jane Smith',
          email: 'jane@example.com',
          home_town: 'Los Angeles',
          birth_date: '1992-05-15',
          phone_numbers: '+1234567891'
        }
      ]
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/user/${id}`)
      return response.data
    } catch (error) {
      console.warn('Backend not available, using mock data:', error.message)
      return {
        user_id: id,
        uname: 'Demo User',
        email: 'demo@example.com',
        home_town: 'Demo City',
        birth_date: '1990-01-01',
        phone_numbers: '+1234567890'
      }
    }
  },

  // Create user
  createUser: async (userData) => {
    try {
      const response = await api.post('/user', userData)
      return response.data
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`)
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/user/${id}`, userData)
      return response.data
    } catch (error) {
      console.warn('Backend not available, mock update:', error.message)
      return { ...userData, user_id: id }
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/user/${id}`)
      return response.data
    } catch (error) {
      console.warn('Backend not available, mock delete:', error.message)
      return { success: true, message: 'User deleted (mock)' }
    }
  }
}