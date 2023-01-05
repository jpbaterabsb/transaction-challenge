import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export function formatBRL (value: number): string {
  return (value / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

interface Message {
  constraints: Record<string, string>
}

interface BadRequestError {
  errors?: Message[]
  message?: string
}

interface UnauthorizedError {
  message?: string
}

function buildErrorBadRequest (err: BadRequestError): void {
  if (err.errors) {
    err.errors.forEach(e => { Object.values(e.constraints).forEach(c => toast(c)) })
    return
  }

  toast(err.message)
}

function buildErrorUnauthorized (err: UnauthorizedError): void {
  if (err.message) {
    toast(err.message)
  } else {
    toast('Sessão Expirada')
  }

  localStorage.clear()
}

export function handleError (e: unknown): void {
  if (e instanceof AxiosError) {
    switch (e.response?.status) {
      case 400: {
        buildErrorBadRequest(e.response.data)
        break
      }
      case 422: {
        toast('O tamanho máximo de um arquivo para ser processado é 5MB')
        break
      }
      case 401: {
        buildErrorUnauthorized(e)
        break
      }
      default: toast('Serviço indisponível')
    }
  }
}
