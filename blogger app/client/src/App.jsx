import { useEffect } from 'react'
import { Link, Route, Routes, Navigate, useMatch } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button } from '@mui/material'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import AppNotification from './components/AppNotification'
import { useBlogs, useBlogsActions } from './store/blogsStore'
import { useUser, useUserActions } from './store/userStore'

const App = () => {
  const blogs = useBlogs()
  const user = useUser()
  const { initializeUser, logout } = useUserActions()
  const { initializeBlogs } = useBlogsActions()

  useEffect(() => {
    initializeUser()
    initializeBlogs()
  }, [initializeUser, initializeBlogs])

  // const incrementLike = async (id, newBlog) => {
  //   try {
  //     const response = await blogService.update(id, newBlog)
  //     setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response.data)))
  //     setNotification('Successfully Liked the blog!', 'success')
  //   } catch (error) {
  //     setNotification(error, 'error')
  //   }
  // }

  // const handleBlogDelete = async (id) => {
  //   try {
  //     await blogService.deleteBlog(id)
  //     setBlogs(blogs.filter((blog) => blog.id !== id))

  //     setNotification(`Blog successfully deleted`, 'success')
  //   } catch (error) {
  //     setNotification(`${error}`, 'error')
  //   }
  // }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  return (
    <Container>
      <AppBar
        position="static"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
        }}
      >
        <h2>Blog App</h2>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/create">
                new blog
              </Button>
              <Button variant="outlined" color="inherit" onClick={logout}>
                logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <AppNotification />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <LoginForm />}
        />
        <Route
          path="/blogs/:id"
          element={blog ? <Blog blog={blog} /> : <Navigate replace to="/" />}
        />
        <Route
          path="/create"
          element={user ? <BlogForm /> : <Navigate replace to="/" />}
        />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Container>
  )
}
export default App
