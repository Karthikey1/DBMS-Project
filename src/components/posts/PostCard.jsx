import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const PostCard = ({ post }) => {
  const { user } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)

  const isAuthor = user && user.user_id === post.user_id
  const contentPreview = post.content.length > 150 && !isExpanded 
    ? post.content.substring(0, 150) + '...' 
    : post.content

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        // await postService.deletePost(post.post_id)
        // You might want to add a callback prop to refresh the parent component
        console.log('Delete post:', post.post_id)
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    }
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <h4>{post.author_name || 'Unknown User'}</h4>
          <span className="post-date">
            {new Date(post.created_at).toLocaleDateString()} at{' '}
            {new Date(post.created_at).toLocaleTimeString()}
          </span>
        </div>
        
        {isAuthor && (
          <div className="post-actions">
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-text">
          {contentPreview}
          {post.content.length > 150 && (
            <button 
              className="text-link"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? ' Show less' : ' Show more'}
            </button>
          )}
        </p>
      </div>

      <div className="post-footer">
        <span className="post-community">
          Posted in: {post.community_name || 'Unknown Community'}
        </span>
      </div>
    </div>
  )
}

export default PostCard