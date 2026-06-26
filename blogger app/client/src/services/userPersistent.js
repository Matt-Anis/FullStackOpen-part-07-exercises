const saveUser = (newUser) =>
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))
const removeUser = () => window.localStorage.removeItem('loggedBlogappUser')
const getUser = () => window.localStorage.getItem('loggedBlogappUser')

export default { saveUser, removeUser, getUser }
