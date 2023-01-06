import { AxiosResponse } from 'axios'
import { rest } from '../configurations/rest'

export interface LoginRequest {
  username: string
  password: string
}

/**
 * Authenticate an user
 */
export const signin = async (loginRequest: LoginRequest): Promise<AxiosResponse> => {
  return await rest.post('/auth/login', loginRequest)
}
