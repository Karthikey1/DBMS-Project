import React from 'react'
import CommunityCard from './CommunityCard'

const CommunityList = ({ 
  communities, 
  onJoinCommunity, 
  onLeaveCommunity, 
  showJoinButton 
}) => {
  if (!communities || communities.length === 0) {
    return (
      <div className="empty-state">
        <h3>No communities found</h3>
        <p>Be the first to create a community or check back later!</p>
      </div>
    )
  }

  return (
    <div className="community-list">
      {communities.map(community => (
        <CommunityCard
          key={community.community_id}
          community={community}
          onJoin={onJoinCommunity}
          onLeave={onLeaveCommunity}
          showJoinButton={showJoinButton}
        />
      ))}
    </div>
  )
}

export default CommunityList