import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { eventService } from '../services/eventService'
import EventList from '../components/events/EventList'
import CreateEventForm from '../components/events/CreateEventForm'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Events = () => {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [filter, setFilter] = useState('all') // all, upcoming, past

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setLoading(true)
      const eventsData = await eventService.getAllEvents()
      setEvents(eventsData)
    } catch (error) {
      console.error('Error loading events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async (eventData) => {
    try {
      await eventService.createEvent({
        ...eventData,
        user_id: user.user_id
      })
      setShowCreateForm(false)
      loadEvents() // Reload events
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.event_date)
    const today = new Date()
    
    switch (filter) {
      case 'upcoming':
        return eventDate >= today
      case 'past':
        return eventDate < today
      default:
        return true
    }
  })

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="events-page">
      <div className="container">
        <div className="page-header">
          <h1>Community Events</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            Create Event
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Events
          </button>
          <button 
            className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`filter-tab ${filter === 'past' ? 'active' : ''}`}
            onClick={() => setFilter('past')}
          >
            Past Events
          </button>
        </div>

        {/* Events List */}
        <div className="events-content">
          <EventList events={filteredEvents} />
        </div>

        {/* Create Event Modal */}
        {showCreateForm && (
          <CreateEventForm
            onClose={() => setShowCreateForm(false)}
            onSubmit={handleCreateEvent}
          />
        )}
      </div>
    </div>
  )
}

export default Events