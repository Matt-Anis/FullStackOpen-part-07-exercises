import { useEffect, useContext } from 'react'
import { Link, Route, Routes, Navigate, useMatch } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button } from '@mui/material'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UsersTable from './components/UsersTable'
import User from './components/User'
import AppNotification from './components/AppNotification'
import { useBlogs } from './hooks/useBlogs'
import UserContext from './context/userContext'
import { useUsers } from './hooks/useUsers'

const App = () => {
  const { blogs } = useBlogs()
  const { user, initializeUser, logout } = useContext(UserContext)
  const { users } = useUsers()

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  const blogMatch = useMatch('/blogs/:id')
  const userMatch = useMatch('/users/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null
  const matchedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

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
          </Button>{' '}
          <Button color="inherit" component={Link} to="/users">
            users
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
        <Route path="/users" element={<UsersTable />} />
        <Route
          path="/blogs/:id"
          element={blog ? <Blog blog={blog} /> : <Navigate replace to="/" />}
        />
        <Route
          path="/users/:id"
          element={
            matchedUser ? (
              <User user={matchedUser} />
            ) : (
              <Navigate replace to="/" />
            )
          }
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
