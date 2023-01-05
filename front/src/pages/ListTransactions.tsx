import React, { useEffect, useState } from 'react';
import { LocalTable } from '../components/LocalTable';
import { NavigationButton } from '../components/NavigationButton';
import { SelectGroup } from '../components/SelectGroup';
import { listTransactions } from '../services/transactions.service';
import { GROUPS, Transaction } from '../types';
import { formatBRL, handleError } from '../utils';

export interface LisTransactionsData {
    transactions: Transaction[];
    total: number;
}

const ListTransactions: React.FC = () => {
    const [transactions, setTransacitons] = useState<Transaction[]>([]);
    const [total, setTotal] = useState<number>(0);
    async function loadTransactions(group: GROUPS) {
        try {
            const { data } = await listTransactions(group);
            console.log(data);
            const { transactions, total } = data as LisTransactionsData;
            setTransacitons(transactions);
            setTotal(total);
        } catch (e) {
            handleError(e);
        }
    }
    useEffect(() => {
        loadTransactions(GROUPS.AFILIADO);
    }, []);

    return <div className="container mx-auto pb-32">
        <NavigationButton to="/home" label='Registrar Transações' />
        <SelectGroup onChange={(group) => loadTransactions(group)} />

        <LocalTable transactions={transactions} />
        {total && (<span className='flex justify-end pt-5 pr-8'>{`Total: ${formatBRL(total)}`}</span>)}
    </div>;
}

export default ListTransactions;
