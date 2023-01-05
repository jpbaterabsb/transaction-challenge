import { AxiosResponse } from 'axios'
import { rest } from '../configurations/rest'

export interface LoginRequest {
  username: string
  password: string
}

export const signin = async (loginRequest: LoginRequest): Promise<AxiosResponse> => {
  return await rest.post('/auth/login', loginRequest)
}
