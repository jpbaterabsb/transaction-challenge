import { render, screen } from '@testing-library/react'
import { TransactionTable } from './TransactionTable'

const transactions = [
  {
    id: 1,
    type: 2,
    date: '2022-01-16T17:13:54.000Z',
    product: 'CURSO DE BEM-ESTAR',
    amount: 12750,
    seller: 'THIAGO OLIVEIRA',
    transactionType: {
      id: 2,
      description: 'Venda afiliado',
      type: 'IN'
    }
  }
]

describe('TransactionTable.tsx', () => {
  it('render without transactions', () => {
    render(<TransactionTable transactions={[]}/>)
    expect(screen.getByText(/Não há transações para serem apresentadas/i)).toBeInTheDocument()
  })

  it('render with transactions', () => {
    render(<TransactionTable transactions={transactions} />)
    expect(screen.getByTestId('row1')).toBeInTheDocument()
    expect(screen.queryByTestId('row2')).not.toBeInTheDocument()
  })
})
