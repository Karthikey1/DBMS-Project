import React from 'react'
import EventCard from './EventCard'

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="empty-state">
        <h3>No events found</h3>
        <p>There are no events scheduled at the moment.</p>
      </div>
    )
  }

  return (
    <div className="event-list">
      {events.map(event => (
        <EventCard key={event.event_id} event={event} />
      ))}
    </div>
  )
}

export default EventList