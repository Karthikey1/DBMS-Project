import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { communityService } from '../services/communityService'
import CommunityList from '../components/communities/CommunityList'
import CreateCommunityForm from '../components/communities/CreateCommunityForm'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Dashboard = () => {
  const { user } = useAuth()
  const [myCommunities, setMyCommunities] = useState([])
  const [allCommunities, setAllCommunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    loadCommunities()
  }, [user])

  const loadCommunities = async () => {
    try {
      setLoading(true)
      if (user) {
        const [userCommunities, allComms] = await Promise.all([
          communityService.getUserCommunities(user.user_id),
          communityService.getAllCommunities()
        ])
        setMyCommunities(userCommunities)
        setAllCommunities(allComms)
      }
    } catch (error) {
      console.error('Error loading communities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinCommunity = async (communityId) => {
    try {
      await communityService.joinCommunity({
        user_id: user.user_id,
        community_id: communityId,
        role: 'member'
      })
      loadCommunities() // Reload to update lists
    } catch (error) {
      console.error('Error joining community:', error)
    }
  }

  const handleLeaveCommunity = async (membershipId) => {
    try {
      await communityService.leaveCommunity(membershipId)
      loadCommunities() // Reload to update lists
    } catch (error) {
      console.error('Error leaving community:', error)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.uname}!</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            Create Community
          </button>
        </div>

        <div className="dashboard-content">
          <section className="my-communities">
            <h2>My Communities</h2>
            <CommunityList 
              communities={myCommunities}
              onLeaveCommunity={handleLeaveCommunity}
              showJoinButton={false}
            />
          </section>

          <section className="explore-communities">
            <h2>Explore Communities</h2>
            <CommunityList 
              communities={allCommunities.filter(comm => 
                !myCommunities.some(myComm => myComm.community_id === comm.community_id)
              )}
              onJoinCommunity={handleJoinCommunity}
              showJoinButton={true}
            />
          </section>
        </div>

        {showCreateForm && (
          <CreateCommunityForm
            onClose={() => setShowCreateForm(false)}
            onSuccess={() => {
              setShowCreateForm(false)
              loadCommunities()
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard