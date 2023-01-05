export enum GROUPS {
  PRODUTOR = 1,
  AFILIADO,
  NENHUM
}

export interface TransactionType {
  description: string
  type: string
  id: number
}

export interface Transaction {
  id: number
  type: number
  date: string
  product: string
  amount: number
  seller: string
  transactionType: TransactionType
}

export interface Error { constraints: Record<string, string> }
export type ErrorByLine = Record<number, Error[]>
