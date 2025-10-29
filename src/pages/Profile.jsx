import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/userService'
import { communityService } from '../services/communityService'
import LoadingSpinner from '../components/common/LoadingSpinner'
import CommunityList from '../components/communities/CommunityList'

const Profile = () => {
  const { user } = useAuth()
  const [userData, setUserData] = useState(null)
  const [userCommunities, setUserCommunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    loadUserData()
  }, [user])

  const loadUserData = async () => {
    try {
      setLoading(true)
      if (user) {
        const [userDetails, communities] = await Promise.all([
          userService.getUserById(user.user_id),
          communityService.getUserCommunities(user.user_id)
        ])
        setUserData(userDetails)
        setUserCommunities(communities)
        setFormData(userDetails)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      await userService.updateUser(user.user_id, formData)
      setUserData(formData)
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleCancel = () => {
    setFormData(userData)
    setEditing(false)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!userData) {
    return (
      <div className="container">
        <div className="error-state">
          <h2>User not found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          {!editing ? (
            <button 
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <div className="profile-info">
              <div className="info-group">
                <label>Name</label>
                {editing ? (
                  <input
                    type="text"
                    name="uname"
                    value={formData.uname || ''}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p>{userData.uname}</p>
                )}
              </div>

              <div className="info-group">
                <label>Email</label>
                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p>{userData.email}</p>
                )}
              </div>

              <div className="info-group">
                <label>Home Town</label>
                {editing ? (
                  <input
                    type="text"
                    name="home_town"
                    value={formData.home_town || ''}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p>{userData.home_town || 'Not specified'}</p>
                )}
              </div>

              <div className="info-group">
                <label>Birth Date</label>
                {editing ? (
                  <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date || ''}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p>{userData.birth_date || 'Not specified'}</p>
                )}
              </div>

              <div className="info-group">
                <label>Phone Number</label>
                {editing ? (
                  <input
                    type="tel"
                    name="phone_numbers"
                    value={formData.phone_numbers || ''}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p>{userData.phone_numbers || 'Not specified'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>My Communities</h2>
            <CommunityList 
              communities={userCommunities}
              showJoinButton={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile