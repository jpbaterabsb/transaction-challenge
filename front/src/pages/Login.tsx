import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { LoginInput } from '../components/LoginInput'
import { signin } from '../services/authentication.service'
import { jwtState } from '../states/jwt/jwt.atom'
import { handleError } from '../utils'

interface User {
  username: string
  password: string
}

export const Login: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setJwt] = useRecoilState(jwtState)
  const navigate = useNavigate()
  const [user, setUser] = useState<User>({
    username: '',
    password: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    signin(user)
      .then(r => {
        setJwt(r.data.access_token)
        navigate('/home')
      })
      .catch(e => {
        e.message = 'Usuário e/ou senha estão incorretos'
        handleError(e)
      })
  }

  return (
        <div className="min-h-screen flex flex-1 justify-center items-center bg-[#F8F9F9]">
            <div className="w-96">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <h3 className="text-4xl font-bold text-center text-gray-800 my-4">Desafio Hubla</h3>
                <LoginInput label='Username' name='username' type='text' value={user.username} onChange={handleChange} />
                <LoginInput label='Password' name='password' type='password' value={user.password} onChange={handleChange} />
                    <div className="flex items-center justify-between">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>
            </div>
        </div>
  )
}
