import { createContext, useState, useCallback } from 'react'
import { setNotification } from '../store/notificationStore'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userPersistentService from '../services/userPersistent'

const UserContext = createContext()

export default UserContext

export const UserContextProvider = (props) => {
  const [user, setUser] = useState()

  const login = async (userObject) => {
    try {
      const newUser = await loginService.login(userObject)

      userPersistentService.saveUser(JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)

      setNotification('Successfully Logged in', 'success')
    } catch {
      setNotification('Wrong credentials', 'error')
    }
  }

  const logout = () => {
    userPersistentService.getUser()
    setUser(null)
    blogService.setToken(null)

    setNotification('Successfully Logged out', 'success')
  }

  const initializeUser = useCallback(() => {
    const user = JSON.parse(userPersistentService.getUser())
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, login, logout, initializeUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
