import { selector } from 'recoil'
import { jwtState } from './jwt.atom'

export const isAuthenticated = selector({
  key: 'IS_AUTHENTICATED',
  get: ({ get }) => {
    const jwt = get(jwtState)
    if (!jwt) {
      return false
    }
    try {
      // decode the JWT to get the expiry time
      const { exp } = JSON.parse(atob(jwt.split('.')[1]))
      // check if the JWT has expired
      return exp * 1000 > Date.now()
    } catch (error) {
      return false
    }
  }
})
