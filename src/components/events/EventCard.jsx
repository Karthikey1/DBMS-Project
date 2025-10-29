import React from 'react'
import { useAuth } from '../../context/AuthContext'

const EventCard = ({ event }) => {
  const { user } = useAuth()
  const isAuthor = user && user.user_id === event.user_id

  const eventDate = new Date(event.event_date)
  const now = new Date()
  const isPastEvent = eventDate < now

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        // await eventService.deleteEvent(event.event_id)
        // You might want to add a callback prop to refresh the parent component
        console.log('Delete event:', event.event_id)
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  return (
    <div className={`event-card ${isPastEvent ? 'past-event' : ''}`}>
      <div className="event-header">
        <h3 className="event-title">{event.event_title}</h3>
        {isPastEvent && <span className="past-badge">Past Event</span>}
      </div>

      <div className="event-details">
        <div className="event-detail">
          <strong>Date & Time:</strong>
          <span>{eventDate.toLocaleDateString()} at {eventDate.toLocaleTimeString()}</span>
        </div>
        
        <div className="event-detail">
          <strong>Location:</strong>
          <span>{event.location}</span>
        </div>
        
        <div className="event-detail">
          <strong>Organizer:</strong>
          <span>{event.organizer_name || 'Unknown'}</span>
        </div>
      </div>

      {event.event_description && (
        <div className="event-description">
          <p>{event.event_description}</p>
        </div>
      )}

      <div className="event-footer">
        <div className="event-community">
          {event.community_name && `Posted in: ${event.community_name}`}
        </div>
        
        {isAuthor && (
          <div className="event-actions">
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventCard