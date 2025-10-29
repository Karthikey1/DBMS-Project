import React, { useState, useEffect } from 'react'
import { communityService } from '../../services/communityService'
import LoadingSpinner from '../common/LoadingSpinner'

const CommunityMembers = ({ communityId }) => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMembers()
  }, [communityId])

  const loadMembers = async () => {
    try {
      setLoading(true)
      const membersData = await communityService.getCommunityMembers(communityId)
      setMembers(membersData)
    } catch (error) {
      console.error('Error loading members:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="community-members">
      <h3>Community Members ({members.length})</h3>
      
      {members.length === 0 ? (
        <div className="empty-state">
          <p>No members found in this community.</p>
        </div>
      ) : (
        <div className="members-list">
          {members.map(member => (
            <div key={member.membership_id} className="member-card">
              <div className="member-info">
                <h4>{member.uname}</h4>
                <span className={`member-role ${member.role}`}>
                  {member.role}
                </span>
              </div>
              
              <div className="member-meta">
                <span>Joined: {new Date(member.joined_on).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommunityMembers