// middleware/checkToken.js

export default function ({ store, redirect, route }) {
  const token = store.state.token
  const token2 = localStorage.getItem('token')

  // If token is null or empty and the user is not on the login page1to, redirect to the login page
  if (
    (!token || token.trim() === '') &&
    route.path !== '/login' &&
    (!token2 || token2.trim() === '')
  ) {
    return redirect('/login')
  }
}
