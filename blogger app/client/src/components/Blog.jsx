import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Container,
} from '@mui/material'
import { useBlogs } from '../hooks/useBlogs'
import UserContext from '../context/userContext'
import { useContext } from 'react'
import useField from '../hooks/useField'

const Blog = ({ blog }) => {
  const { user } = useContext(UserContext)
  const { likeBlog, deleteBlog, commentBlog } = useBlogs()
  const comment = useField()

  const handleLike = async () => {
    await likeBlog(blog)
  }

  const handleDeleteBlog = async () => {
    if (!window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
      return
    }
    await deleteBlog(blog.id)
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    await commentBlog(blog.id, comment.value)
    comment.clear()
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
        <Container>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              required
              label="comment"
              variant="outlined"
              value={comment.value}
              onChange={comment.onChange}
            />
            <Button variant="contained" type="submit">
              submit
            </Button>
          </form>
        </Container>
        <ul>
          {blog?.comments.map((comment) => (
            <li key={Math.random() * 100000}>{comment}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default Blog
