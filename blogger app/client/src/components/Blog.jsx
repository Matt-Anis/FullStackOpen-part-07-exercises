import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  List,
  Box,
  Divider,
  Link,
  ListItem,
  ListItemText,
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
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4">{blog.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.url}
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              by {blog.author}
            </Typography>
          </Box>

          <Divider />

          {/* Likes */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">Likes: {blog.likes}</Typography>
            {user && (
              <Button size="small" variant="outlined" onClick={handleLike}>
                👍 Like
              </Button>
            )}
          </Stack>

          {/* Meta */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="textSecondary">
              Added by: {blog?.user?.username}
            </Typography>
            {user?.username === blog?.user?.username && (
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={handleDeleteBlog}
              >
                Remove
              </Button>
            )}
          </Stack>

          <Divider />

          {/* Comments */}
          <Typography variant="h6">Comments</Typography>

          <Stack
            component="form"
            onSubmit={handleCommentSubmit}
            direction="row"
            spacing={1}
          >
            <TextField
              required
              label="Comment"
              variant="outlined"
              size="small"
              fullWidth
              value={comment.value}
              onChange={comment.onChange}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add
            </Button>
          </Stack>

          <List dense>
            {blog?.comments.map((comment, i) => (
              <ListItem key={i} disableGutters>
                <ListItemText primary={comment} />
              </ListItem>
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Blog
