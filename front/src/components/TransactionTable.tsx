import { Table } from 'flowbite-react'
import { Transaction } from '../types'
import { formatBRL } from '../utils'

export interface TransactionTableProps {
  transactions: Transaction[]
}

const formatedTransactionType: Record<string, string> = {
  IN: 'Entrada',
  OUT: 'Saída'
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }: TransactionTableProps) => {
  return <Table>
        <Table.Head>
            <Table.HeadCell>
                Tipo de Transação
            </Table.HeadCell>
            <Table.HeadCell>
                Natureza
            </Table.HeadCell>
            <Table.HeadCell>
                Data
            </Table.HeadCell>
            <Table.HeadCell>
                Produto
            </Table.HeadCell>
            <Table.HeadCell>
                Valor
            </Table.HeadCell>
            <Table.HeadCell>
                Vendedor
            </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {transactions.length > 0
              ? transactions.map(t =>
                (
                <Table.Row data-testid={`row${t.id}`} key={t.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                        {t.transactionType.description}
                    </Table.Cell>
                    <Table.Cell>
                        {formatedTransactionType[t.transactionType.type]}
                    </Table.Cell>
                    <Table.Cell>
                        {new Date(t.date).toLocaleString('pt-BR')}
                    </Table.Cell>
                    <Table.Cell>
                        {t.product}
                    </Table.Cell>
                    <Table.Cell>
                        {formatBRL(t.amount)}
                    </Table.Cell>
                    <Table.Cell>
                        {t.seller}
                    </Table.Cell>
                </Table.Row>
                )
              )
              : (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                            Não há transações para serem apresentadas
                        </Table.Cell>
                    </Table.Row>
                )
            }
        </Table.Body>
    </Table >
}
