import useField from '../hooks/useField'
import { Button, TextField, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'

const BlogForm = () => {
  const { addBlog } = useBlogs()
  const navigate = useNavigate()
  const title = useField()
  const author = useField()
  const url = useField()

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    await addBlog({ title: title.value, author: author.value, url: url.value })
    author.clear()
    title.clear()
    url.clear()
    navigate('/')
  }

  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '2rem',
  }
  return (
    <Container>
      <h2>Add blog</h2>
      <form style={style} onSubmit={handleBlogSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          value={title.value}
          onChange={title.onChange}
        />

        <TextField
          label="Author"
          variant="outlined"
          value={author.value}
          onChange={author.onChange}
        />

        <TextField
          label="URL"
          variant="outlined"
          type="url"
          value={url.value}
          onChange={url.onChange}
        />

        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </Container>
  )
}

export default BlogForm
