import { useState } from 'react'
import { Button, TextField, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useBlogsActions } from '../store/blogsStore'
import { setNotification } from '../store/notificationStore'

const BlogForm = () => {
  const { addBlog } = useBlogsActions()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    try {
      const returnedBlog = await addBlog({ title, author, url })
      navigate('/')
      setNotification(
        `A new blog "${returnedBlog.title}" by "${returnedBlog.author}" added!`,
        'success',
      )
    } catch (error) {
      setNotification(`${error}`, 'error')
    }
    setAuthor('')
    setTitle('')
    setUrl('')
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
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <TextField
          label="Author"
          variant="outlined"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <TextField
          label="URL"
          variant="outlined"
          type="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />

        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </Container>
  )
}

export default BlogForm
