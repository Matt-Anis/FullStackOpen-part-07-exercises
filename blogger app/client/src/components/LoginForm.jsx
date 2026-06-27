import { useContext } from 'react'
import { Button, TextField, Container } from '@mui/material'
import UserContext from '../context/userContext'
import useField from '../hooks/useField'

const LoginForm = () => {
  const { login } = useContext(UserContext)
  const username = useField()
  const password = useField()

  const handleLogin = (event) => {
    event.preventDefault()

    login({ username: username.value, password: password.value })
  }

  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '2rem',
  }
  return (
    <Container>
      <h2>Login</h2>
      <form style={style} onSubmit={handleLogin}>
        <TextField
          required
          label="username"
          variant="outlined"
          value={username.value}
          onChange={username.onChange}
        />
        <TextField
          type="password"
          label="password"
          variant="outlined"
          value={password.value}
          onChange={password.onChange}
        />
        <Button variant="contained" type="submit">
          login
        </Button>
      </form>
    </Container>
  )
}

export default LoginForm
