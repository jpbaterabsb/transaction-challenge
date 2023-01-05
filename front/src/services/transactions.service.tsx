import { AxiosResponse } from 'axios'
import { rest } from '../configurations/rest'

export const registerTransactions = async (file: File): Promise<AxiosResponse> => {
  const formData = new FormData()
  formData.append('file', file)
  return await rest.post('/transactions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const listTransactions = async (group: number): Promise<AxiosResponse> => {
  const query = group < 3 ? `?group=${group}` : ''
  return await rest.get(`/transactions${query}`)
}
