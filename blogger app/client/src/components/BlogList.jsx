import { Link } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'

const BlogList = () => {
  const { blogs, isPending } = useBlogs()

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Blogs
      </Typography>
      <List data-testid="blogs-container" disablePadding>
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <ListItem key={blog.id} disableGutters divider>
              <ListItemText
                primary={
                  <Link
                    to={`/blogs/${blog.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography color="primary">{blog.title}</Typography>
                  </Link>
                }
                secondary={`by ${blog.author} · ${blog.likes} likes`}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  )
}

export default BlogList
