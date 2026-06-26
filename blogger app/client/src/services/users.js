const getAll = async () => {
  const response = await fetch('/api/users')
  return response.json()
}

export default { getAll }
