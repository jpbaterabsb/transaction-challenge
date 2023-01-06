import { AxiosResponse } from 'axios'
import { rest } from '../configurations/rest'

/**
 * Register transactions by a file.
 */
export const registerTransactions = async (file: File): Promise<AxiosResponse> => {
  const formData = new FormData()
  formData.append('file', file)
  return await rest.post('/transactions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * Get transactions with a possibility to filter data by group, group is the same of transaction type
 * group types:
 * 1 - PRODUTOR
 * 2 - AFILIADO
 */
export const listTransactions = async (group: number): Promise<AxiosResponse> => {
  const query = group < 3 ? `?group=${group}` : ''
  return await rest.get(`/transactions${query}`)
}
