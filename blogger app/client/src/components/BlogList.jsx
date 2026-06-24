import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useBlogs, useBlogsActions } from '../store/blogsStore'

const BlogList = () => {
  const { initializeBlogs } = useBlogsActions()
  const blogs = useBlogs()
  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])
  return (
    <div>
      <h2>blogs</h2>
      <ul data-testid="blogs-container">
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogList
