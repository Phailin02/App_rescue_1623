import secureStorage from './secure-storage'
export default function ({ $axios, store, redirect }) {
  $axios.onRequest((request) => {
    let token = null

    if (
      secureStorage.getItem('token') ||
      secureStorage.getItem('token') !== undefined
    ) {
      token = secureStorage.getItem('token')
    }

    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`
    }
    return request
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      // Redirect to login page
      redirect('/login')
    }
    return Promise.reject(error)
  })
}
