import React, { useState } from 'react'
import Modal from '../common/Modal'

const CreateEventForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    event_title: '',
    event_description: '',
    event_date: '',
    location: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.event_title.trim() || !formData.event_date || !formData.location.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    await onSubmit(formData)
    setLoading(false)
  }

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0]

  return (
    <Modal isOpen={true} onClose={onClose} title="Create New Event">
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-group">
          <label htmlFor="event_title" className="form-label">
            Event Title *
          </label>
          <input
            type="text"
            id="event_title"
            name="event_title"
            className="form-input"
            value={formData.event_title}
            onChange={handleChange}
            required
            placeholder="Enter event title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="event_description" className="form-label">
            Description
          </label>
          <textarea
            id="event_description"
            name="event_description"
            className="form-textarea"
            value={formData.event_description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your event..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="event_date" className="form-label">
            Event Date & Time *
          </label>
          <input
            type="datetime-local"
            id="event_date"
            name="event_date"
            className="form-input"
            value={formData.event_date}
            onChange={handleChange}
            required
            min={today}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-input"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Where will the event take place?"
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateEventForm