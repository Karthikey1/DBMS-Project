import React, { useState } from 'react'
import Modal from '../common/Modal'

const CreatePostForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
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
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)
    await onSubmit(formData)
    setLoading(false)
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="Create New Post">
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter a title for your post"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Post Content
          </label>
          <textarea
            id="content"
            name="content"
            className="form-textarea"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            placeholder="What would you like to share with the community?"
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
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreatePostForm