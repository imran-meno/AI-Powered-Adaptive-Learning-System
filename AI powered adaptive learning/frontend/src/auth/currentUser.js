export function getCurrentUser() {
  const storedUser = sessionStorage.getItem('currentUser')
  return storedUser ? JSON.parse(storedUser) : null
}

export function clearCurrentUser() {
  sessionStorage.removeItem('currentUser')
}
