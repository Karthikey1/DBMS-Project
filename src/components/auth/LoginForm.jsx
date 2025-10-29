import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    const result = await login(formData.email, formData.password)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error || 'Login failed')
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
          placeholder="Enter your password"
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary btn-full"
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  )
}

export default LoginForm