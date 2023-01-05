import { useRecoilState, useRecoilValue } from 'recoil'
import { isAuthenticated } from '../states/jwt/jwt.selectors'
import { useLocation, useNavigate } from 'react-router-dom'

import React, { useEffect } from 'react'
import { Login } from '../pages/Login'
import { Button } from 'flowbite-react'
import { jwtState } from '../states/jwt/jwt.atom'

type LoggedInProps = React.PropsWithChildren

const LoggedIn: React.FC<LoggedInProps> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setJwt] = useRecoilState(jwtState)
  const navigate = useNavigate()

  function logOut (): void {
    setJwt('')
    localStorage.clear()
    navigate('/login')
  }

  return <div>
        <div className='absolute top-6 left-32'>
        <Button data-testid="main-button" color={'failure'} onClick={logOut}>
            Deslogar
        </Button>
        </div>
        {children}
    </div>
}

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }): React.ReactElement | null => {
  const authenticated = useRecoilValue(isAuthenticated)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!authenticated) {
      navigate('/login')
    }

    if (authenticated && location.pathname === '/login') {
      navigate('/home')
    }
  }, [])

  return location.pathname === '/login' ? <Login /> : <LoggedIn>{children}</LoggedIn>
}
