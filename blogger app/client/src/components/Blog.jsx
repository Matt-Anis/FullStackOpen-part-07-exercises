import { Card, CardContent, Typography, Button } from '@mui/material'
import { useBlogs } from '../hooks/useBlogs'
import UserContext from '../context/userContext'
import { useContext } from 'react'
import { randomUUID } from 'crypto'

const Blog = ({ blog }) => {
  const { user } = useContext(UserContext)
  const { likeBlog, deleteBlog } = useBlogs()
  const handleLike = async () => {
    await likeBlog(blog)
  }

  const handleDeleteBlog = async () => {
    if (!window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
      return
    }
    await deleteBlog(blog.id)
  }

  return (
    <Card data-testid="blog-container">
      <CardContent>
        <Typography variant="h4">{blog.title}</Typography>
        <Typography variant="body" color="textSecondary">
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </Typography>
        <Typography variant="body2">by: {blog.author}</Typography>
        <Typography variant="body2">Likes: {blog.likes}</Typography>
        {user && <Button onClick={handleLike}>Like</Button>}
        <Typography variant="body2">
          Added by: {blog?.user?.username}
        </Typography>
        {user?.username === blog?.user?.username && (
          <Button onClick={handleDeleteBlog} color="error">
            Remove
          </Button>
        )}
        <h3>Comments</h3>
        <ul>
          {blog?.comments.map((comment) => (
            <li key={randomUUID()}>{comment}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default Blog
