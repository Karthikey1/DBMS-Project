import api from './api'

export const communityService = {
  // Get all communities
  getAllCommunities: async () => {
    try {
      const response = await api.get('/community')
      return response.data
    } catch (error) {
      console.warn('Backend not available, using mock data:', error.message)
      return [
        {
          community_id: 1,
          cname: 'New York Expats',
          description: 'A community for people from New York living abroad',
          user_id: 1,
          creator_name: 'John Doe',
          member_count: 5
        },
        {
          community_id: 2,
          cname: 'California Dreamers',
          description: 'Californians connecting around the world',
          user_id: 2,
          creator_name: 'Jane Smith',
          member_count: 3
        },
        {
          community_id: 3,
          cname: 'Texas Worldwide',
          description: 'Keeping Texas culture alive everywhere',
          user_id: 1,
          creator_name: 'John Doe',
          member_count: 8
        }
      ]
    }
  },

  // Get community by ID
  getCommunityById: async (id) => {
    try {
      const response = await api.get(`/community/${id}`)
      return response.data
    } catch (error) {
      console.warn('Backend not available, using mock data:', error.message)
      return {
        community_id: parseInt(id),
        cname: 'Demo Community',
        description: 'This is a demo community description',
        user_id: 1,
        creator_name: 'Demo User',
        member_count: 5
      }
    }
  },

  // Create new community
  createCommunity: async (communityData) => {
    try {
      const response = await api.post('/community', communityData)
      return response.data
    } catch (error) {
      console.warn('Backend not available, mock create:', error.message)
      return {
        community_id: Date.now(),
        ...communityData,
        creator_name: 'Current User',
        member_count: 1
      }
    }
  },

  // Update community
  updateCommunity: async (id, communityData) => {
    try {
      const response = await api.put(`/community/${id}`, communityData)
      return response.data
    } catch (error) {
      throw new Error(`Failed to update community: ${error.message}`)
    }
  },

  // Delete community
  deleteCommunity: async (id) => {
    try {
      const response = await api.delete(`/community/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to delete community: ${error.message}`)
    }
  },

  // Get user's communities
  getUserCommunities: async (userId) => {
    try {
      const response = await api.get(`/user/${userId}/communities`)
      return response.data
    } catch (error) {
      console.warn('Backend not available, using mock data:', error.message)
      return [
        {
          community_id: 1,
          cname: 'New York Expats',
          description: 'A community for people from New York living abroad',
          membership_id: 1,
          role: 'member'
        }
      ]
    }
  },

  // Join community
  joinCommunity: async (membershipData) => {
    try {
      const response = await api.post('/members/join', membershipData)
      return response.data
    } catch (error) {
      console.warn('Backend not available, mock join:', error.message)
      return {
        membership_id: Date.now(),
        ...membershipData,
        joined_on: new Date().toISOString(),
        role: 'member'
      }
    }
  },

  // Leave community
  leaveCommunity: async (membershipId) => {
    try {
      const response = await api.delete(`/members/leave/${membershipId}`)
      return response.data
    } catch (error) {
      console.warn('Backend not available, mock leave:', error.message)
      return { success: true, message: 'Left community (mock)' }
    }
  },

  // Get community members
  getCommunityMembers: async (communityId) => {
    try {
      const response = await api.get(`/community/${communityId}/members`)
      return response.data
    } catch (error) {
      console.warn('Backend not available, using mock data:', error.message)
      return [
        {
          membership_id: 1,
          user_id: 1,
          uname: 'John Doe',
          role: 'admin',
          joined_on: '2024-01-15T00:00:00Z'
        },
        {
          membership_id: 2,
          user_id: 2,
          uname: 'Jane Smith',
          role: 'member',
          joined_on: '2024-01-20T00:00:00Z'
        }
      ]
    }
  }
}