import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { communityService } from '../../services/communityService'
import Modal from '../common/Modal'

const CreateCommunityForm = ({ onClose, onSuccess }) => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    cname: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await communityService.createCommunity({
        ...formData,
        user_id: user.user_id
      })
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="Create New Community">
      <form onSubmit={handleSubmit} className="modal-form">
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="cname" className="form-label">
            Community Name
          </label>
          <input
            type="text"
            id="cname"
            name="cname"
            className="form-input"
            value={formData.cname}
            onChange={handleChange}
            required
            placeholder="Enter community name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe what this community is about..."
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
            {loading ? 'Creating...' : 'Create Community'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateCommunityForm