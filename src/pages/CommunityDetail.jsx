import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { communityService } from '../services/communityService'
import { postService } from '../services/postService'
import { eventService } from '../services/eventService'
import LoadingSpinner from '../components/common/LoadingSpinner'
import PostList from '../components/posts/PostList'
import CreatePostForm from '../components/posts/CreatePostForm'
import EventList from '../components/events/EventList'
import CreateEventForm from '../components/events/CreateEventForm'
import CommunityMembers from '../components/communities/CommunityMembers'

const CommunityDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [community, setCommunity] = useState(null)
  const [posts, setPosts] = useState([])
  const [events, setEvents] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [loading, setLoading] = useState(true)
  const [showPostForm, setShowPostForm] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)

  useEffect(() => {
    loadCommunityData()
  }, [id])

  const loadCommunityData = async () => {
    try {
      setLoading(true)
      const [communityData, postsData, eventsData] = await Promise.all([
        communityService.getCommunityById(id),
        postService.getPostsByCommunity(id),
        eventService.getEventsByCommunity(id)
      ])
      setCommunity(communityData)
      setPosts(postsData)
      setEvents(eventsData)
    } catch (error) {
      console.error('Error loading community data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (postData) => {
    try {
      await postService.createPost({
        ...postData,
        user_id: user.user_id,
        community_id: id
      })
      setShowPostForm(false)
      loadCommunityData() // Reload posts
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleCreateEvent = async (eventData) => {
    try {
      await eventService.createEvent({
        ...eventData,
        user_id: user.user_id,
        community_id: id
      })
      setShowEventForm(false)
      loadCommunityData() // Reload events
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!community) {
    return (
      <div className="container">
        <div className="error-state">
          <h2>Community not found</h2>
          <p>The community you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="community-detail">
      <div className="container">
        {/* Community Header */}
        <div className="community-header">
          <div className="community-info">
            <h1>{community.cname}</h1>
            <p className="community-description">{community.description}</p>
            <div className="community-stats">
              <span>{posts.length} Posts</span>
              <span>{events.length} Events</span>
              <span>{community.member_count || 0} Members</span>
            </div>
          </div>
          
          <div className="community-actions">
            <button 
              className="btn btn-primary"
              onClick={() => setShowPostForm(true)}
            >
              Create Post
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowEventForm(true)}
            >
              Create Event
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={`tab ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            Members
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'posts' && (
            <div className="posts-section">
              <PostList posts={posts} />
            </div>
          )}
          
          {activeTab === 'events' && (
            <div className="events-section">
              <EventList events={events} />
            </div>
          )}
          
          {activeTab === 'members' && (
            <div className="members-section">
              <CommunityMembers communityId={id} />
            </div>
          )}
        </div>

        {/* Modals */}
        {showPostForm && (
          <CreatePostForm
            onClose={() => setShowPostForm(false)}
            onSubmit={handleCreatePost}
          />
        )}

        {showEventForm && (
          <CreateEventForm
            onClose={() => setShowEventForm(false)}
            onSubmit={handleCreateEvent}
          />
        )}
      </div>
    </div>
  )
}

export default CommunityDetail