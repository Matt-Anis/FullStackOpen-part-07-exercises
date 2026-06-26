const saveUser = (newUser) =>
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))
const removeUser = () => window.localStorage.removeItem('loggedBlogappUser')
const getUser = () =>
  JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

export default { saveUser, removeUser, getUser }
