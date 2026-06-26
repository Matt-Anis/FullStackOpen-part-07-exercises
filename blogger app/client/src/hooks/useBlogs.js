import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

export const useBlogs = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...blogs, newBlog])
    },
  })

  const likeBlogMutation = useMutation({
    mutationFn: ({ id, blog }) => blogService.update(id, blog),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      )
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_, deletedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== deletedBlog.id),
      )
      navigate('/')
    },
  })

  return {
    blogs: result.data ?? [],
    isPending: result.isPending,
    isError: result.isError,
    addBlog: (blog) => newBlogMutation.mutate(blog),
    likeBlog: (blog) =>
      likeBlogMutation.mutate({
        id: blog.id,
        blog: { ...blog, likes: blog.likes + 1, user: blog.user.id },
      }),
    deleteBlog: (id) => deleteBlogMutation.mutate(id),
  }
}
