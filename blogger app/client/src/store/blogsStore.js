import { create } from 'zustand'
import blogService from '../services/blogs'
import { setNotification } from './notificationStore'
// import { useNotificationReducer } from '../context/notificationContext'

const useBlogsStore = create((set) => ({
  blogs: [],
  actions: {
    setBlogs: (blogs) => set({ blogs }),
    addBlog: async (blog) => {
      try {
        const newBlog = await blogService.create(blog)
        set((state) => ({ blogs: [...state.blogs, newBlog] }))
        setNotification(
          `A new blog "${newBlog.title}" by "${newBlog.author}" added!`,
          'success',
        )
      } catch (error) {
        setNotification(`${error}`, 'error')
      }
    },
    initializeBlogs: async () => {
      const initialBlogs = await blogService.getAll()
      set({ blogs: initialBlogs })
    },
    likeBlog: async (blog) => {
      try {
        const response = await blogService.update(blog.id, {
          likes: blog.likes + 1,
        })
        set((state) => ({
          blogs: state.blogs.map((b) => (b.id !== blog.id ? b : response.data)),
        }))
        setNotification('Successfully Liked the blog!', 'success')
      } catch (error) {
        setNotification(error, 'error')
      }
    },
    deleteBlog: async (id) => {
      try {
        await blogService.deleteBlog(id)
        set((state) => ({
          blogs: state.blogs.filter((b) => b.id !== id),
        }))

        setNotification(`Blog successfully deleted`, 'success')
      } catch (error) {
        setNotification(`${error}`, 'error')
      }
    },
  },
}))

export default useBlogsStore
export const useBlogsActions = () => useBlogsStore.getState().actions
export const useBlogs = () => {
  const blogs = useBlogsStore((state) => state.blogs)
  return blogs
}
