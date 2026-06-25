import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

export const useBlogs = () => {
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

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addBlog: (blog) => newBlogMutation.mutate(blog),
  }
}
