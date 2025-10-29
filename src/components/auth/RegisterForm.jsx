import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    uname: '',
    email: '',
    password: '',
    birth_date: '',
    phone_numbers: '',
    home_town: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

    const result = await register(formData)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error || 'Registration failed')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="uname" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          id="uname"
          name="uname"
          className="form-input"
          value={formData.uname}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Create a password"
        />
      </div>

      <div className="form-group">
        <label htmlFor="home_town" className="form-label">
          Home Town
        </label>
        <input
          type="text"
          id="home_town"
          name="home_town"
          className="form-input"
          value={formData.home_town}
          onChange={handleChange}
          placeholder="Where are you from?"
        />
      </div>

      <div className="form-group">
        <label htmlFor="birth_date" className="form-label">
          Birth Date
        </label>
        <input
          type="date"
          id="birth_date"
          name="birth_date"
          className="form-input"
          value={formData.birth_date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone_numbers" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone_numbers"
          name="phone_numbers"
          className="form-input"
          value={formData.phone_numbers}
          onChange={handleChange}
          placeholder="Your phone number"
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary btn-full"
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  )
}

export default RegisterForm