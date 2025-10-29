import React from 'react'
import PostCard from './PostCard'

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No posts yet</h3>
        <p>Be the first to create a post in this community!</p>
      </div>
    )
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostCard key={post.post_id} post={post} />
      ))}
    </div>
  )
}

export default PostList