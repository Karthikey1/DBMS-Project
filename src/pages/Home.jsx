import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

const Home = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('login')

  if (user) {
    return (
      <div className="home-page">
        <section className="hero">
          <div className="container">
            <h1>Welcome to Community Connect</h1>
            <p>Connect with your cultural roots and build meaningful relationships</p>
            <div className="cta-buttons">
              <a href="/dashboard" className="btn btn-primary">Go to Dashboard</a>
              <a href="/events" className="btn btn-secondary">Explore Events</a>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2>What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Cultural Communities</h3>
                <p>Find and join communities based on your cultural, regional, or linguistic background</p>
              </div>
              <div className="feature-card">
                <h3>Social Feed</h3>
                <p>Share experiences, recipes, and stories with your community members</p>
              </div>
              <div className="feature-card">
                <h3>Events & Gatherings</h3>
                <p>Organize and participate in cultural events and meetups</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>Community Connect</h1>
          <p>Bridge the gap between your new location and cultural roots</p>
        </div>
      </section>

      <section className="auth-section">
        <div className="container">
          <div className="auth-tabs">
            <button 
              className={`tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          <div className="auth-content">
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home