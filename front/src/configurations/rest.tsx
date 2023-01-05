import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

axios.interceptors.request.use(function (config) {
  const jwt = getJWT()

  if (jwt) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${jwt}`
    }
  }

  return config
}, async function (error) {
  return await Promise.reject(error)
})

function getJWT (): string | null {
  const authString = localStorage.getItem('auth')
  if (!authString) {
    return null
  }

  const auth = JSON.parse(authString)

  return auth.jwtState
}

export const rest = axios
