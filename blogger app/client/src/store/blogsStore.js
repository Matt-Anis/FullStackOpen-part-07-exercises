import { create } from 'zustand'
import blogService from '../services/blogs'

const useBlogsStore = create((set) => ({
  blogs: [],
  actions: {
    setBlogs: (blogs) => set({ blogs }),
    addBlog: async (blog) => {
      const newBlog = await blogService.create(blog)
      set((state) => ({ blogs: [...state.blogs, newBlog] }))
      return newBlog
    },
    initializeBlogs: async () => {
      const initialBlogs = await blogService.getAll()
      set({ blogs: initialBlogs })
    },
  },
}))

export default useBlogsStore
export const useBlogsActions = () => useBlogsStore.getState().actions
export const useBlogs = () => {
  const blogs = useBlogsStore((state) => state.blogs)
  return blogs
}
