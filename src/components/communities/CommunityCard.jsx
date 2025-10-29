import React from 'react'
import { Link } from 'react-router-dom'

const CommunityCard = ({ 
  community, 
  onJoin, 
  onLeave, 
  showJoinButton,
  currentUser 
}) => {
  const isMember = community.membership_id != null

  return (
    <div className="community-card">
      <div className="community-header">
        <h3>{community.cname}</h3>
        {isMember && (
          <span className="member-badge">Member</span>
        )}
      </div>
      
      <p className="community-description">
        {community.description}
      </p>

      <div className="community-meta">
        <span>Created by: {community.creator_name || 'Admin'}</span>
        <span>Members: {community.member_count || 0}</span>
      </div>

      <div className="community-actions">
        <Link 
          to={`/community/${community.community_id}`}
          className="btn btn-outline"
        >
          View Details
        </Link>

        {showJoinButton && !isMember && (
          <button 
            className="btn btn-primary"
            onClick={() => onJoin(community.community_id)}
          >
            Join Community
          </button>
        )}

        {isMember && (
          <button 
            className="btn btn-danger"
            onClick={() => onLeave(community.membership_id)}
          >
            Leave Community
          </button>
        )}
      </div>
    </div>
  )
}

export default CommunityCard