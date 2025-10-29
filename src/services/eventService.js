import api from './api'

export const eventService = {
  // Get all events
  getAllEvents: async () => {
    try {
      const response = await api.get('/event')
      return response.data
    } catch (error) {
      console.warn('Backend not available, using mock data:', error.message)
      const nextWeek = new Date()
      nextWeek.setDate(nextWeek.getDate() + 7)
      
      const lastWeek = new Date()
      lastWeek.setDate(lastWeek.getDate() - 7)
      
      return [
        {
          event_id: 1,
          event_title: 'Cultural Food Festival',
          event_description: 'Join us for a celebration of diverse cuisines from our home countries.',
          event_date: nextWeek.toISOString(),
          location: 'Central Park',
          user_id: 1,
          organizer_name: 'John Doe',
          community_id: 1,
          community_name: 'New York Expats'
        },
        {
          event_id: 2,
          event_title: 'Language Exchange Meetup',
          event_description: 'Practice different languages and make new friends.',
          event_date: lastWeek.toISOString(),
          location: 'Downtown Cafe',
          user_id: 2,
          organizer_name: 'Jane Smith',
          community_id: 2,
          community_name: 'California Dreamers'
        }
      ]
    }
  },

  // Get events by community
  getEventsByCommunity: async (communityId) => {
    try {
      const response = await api.get(`/community/${communityId}/events`)
      return response.data
    } catch (error) {
      console.warn('Backend not available, using mock data:', error.message)
      const nextWeek = new Date()
      nextWeek.setDate(nextWeek.getDate() + 7)
      
      return [
        {
          event_id: 1,
          event_title: 'Community Gathering',
          event_description: 'Monthly meetup for all community members',
          event_date: nextWeek.toISOString(),
          location: 'Community Center',
          user_id: 1,
          organizer_name: 'John Doe',
          community_id: parseInt(communityId),
          community_name: 'Demo Community'
        }
      ]
    }
  },

  // Create event
  createEvent: async (eventData) => {
    try {
      const response = await api.post('/event', eventData)
      return response.data
    } catch (error) {
      console.warn('Backend not available, mock create:', error.message)
      return {
        event_id: Date.now(),
        ...eventData,
        organizer_name: 'Current User'
      }
    }
  },

  // Update event
  updateEvent: async (id, eventData) => {
    try {
      const response = await api.put(`/event/${id}`, eventData)
      return response.data
    } catch (error) {
      throw new Error(`Failed to update event: ${error.message}`)
    }
  },

  // Delete event
  deleteEvent: async (id) => {
    try {
      const response = await api.delete(`/event/${id}`)
      return response.data
    } catch (error) {
      console.warn('Backend not available, mock delete:', error.message)
      return { success: true, message: 'Event deleted (mock)' }
    }
  }
}