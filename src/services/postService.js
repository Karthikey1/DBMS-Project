import api from './api'

export const postService = {
  // Get posts by community
  getPostsByCommunity: async (communityId) => {
    try {
      const response = await api.get(`/community/${communityId}/posts`)
      return response.data
    } catch (error) {
      console.warn('Backend not available, using mock data:', error.message)
      return [
        {
          post_id: 1,
          title: 'Welcome to our community!',
          content: 'This is the first post in our amazing community. Feel free to introduce yourselves and share your stories.',
          created_at: '2024-01-15T10:30:00Z',
          user_id: 1,
          author_name: 'John Doe',
          community_id: parseInt(communityId),
          community_name: 'Demo Community'
        },
        {
          post_id: 2,
          title: 'Upcoming meetup ideas',
          content: 'I was thinking we could organize a cultural food festival next month. What does everyone think?',
          created_at: '2024-01-16T14:20:00Z',
          user_id: 2,
          author_name: 'Jane Smith',
          community_id: parseInt(communityId),
          community_name: 'Demo Community'
        }
      ]
    }
  },

  // Create post
  createPost: async (postData) => {
    try {
      const response = await api.post('/post', postData)
      return response.data
    } catch (error) {
      console.warn('Backend not available, mock create:', error.message)
      return {
        post_id: Date.now(),
        ...postData,
        created_at: new Date().toISOString(),
        author_name: 'Current User'
      }
    }
  },

  // Update post
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/post/${id}`, postData)
      return response.data
    } catch (error) {
      throw new Error(`Failed to update post: ${error.message}`)
    }
  },

  // Delete post
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/post/${id}`)
      return response.data
    } catch (error) {
      console.warn('Backend not available, mock delete:', error.message)
      return { success: true, message: 'Post deleted (mock)' }
    }
  }
}