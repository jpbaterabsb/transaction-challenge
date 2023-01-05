import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export function formatBRL (value: number): string {
  return (value / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

export function handleError (e: unknown): void {
  if (e instanceof AxiosError) {
    switch (e.response?.status) {
      case 400: {
        toast(e.response.data.message)
        break
      }
      case 422: {
        toast('O tamanho máximo de um arquivo para ser processado é 5MB')
        break
      }
      default: toast('Serviço indisponível')
    }
  }
}
