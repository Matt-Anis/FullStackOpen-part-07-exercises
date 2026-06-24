import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  throw new Error('This is a test error for the ErrorBoundary component') // Test ErrorBoundary
  return (
    <div>
      <h2>blogs</h2>
      <ul data-testid="blogs-container">
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogList
