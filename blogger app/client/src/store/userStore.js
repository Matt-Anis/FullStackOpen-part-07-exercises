import { create } from 'zustand'
import loginService from '../services/login'
import { setNotification } from './notificationStore'
import blogService from '../services/blogs'

const useUserStore = create((set) => ({
  user: null,
  actions: {
    login: async (userObject) => {
      try {
        const newUser = await loginService.login(userObject)

        window.localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(newUser),
        )
        blogService.setToken(newUser.token)
        set({ user: newUser })

        setNotification('Successfully Logged in', 'success')
      } catch {
        setNotification('Wrong credentials', 'error')
      }
    },
    logout: () => {
      window.localStorage.removeItem('loggedBlogappUser')
      set({ user: null })
      blogService.setToken(null)

      setNotification('Successfully Logged out', 'success')
    },
    initializeUser: () => {
      const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
      if (user) {
        set({ user })
        blogService.setToken(user.token)
      }
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
export default useUserStore
