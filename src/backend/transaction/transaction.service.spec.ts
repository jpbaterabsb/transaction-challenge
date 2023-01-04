import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Transaction } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/prisma.service';
import { TransactionService } from './transaction.service';

const transactions: Transaction[] = [
  {
    amount: 10,
    date: new Date(),
    id: 1,
    product: 'CURSO DE BEM ESTAR',
    seller: 'CELSO DE MELO',
    type: 1,
  },
  {
    amount: 15,
    date: new Date(),
    id: 2,
    product: 'CURSO DE HOJE',
    seller: 'JOAO',
    type: 2,
  },
];

describe('TransactionService', () => {
  let service: TransactionService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, TransactionService],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get lines', () => {
    const buffer = readFileSync(
      join(__dirname, '../../assets/sales-test-ok.txt'),
    );

    const lines = service.getLines(buffer);
    expect(lines?.length).toBe(20);
  });

  it('should throw an error when I get lines of empty file', () => {
    const t = () => service.getLines(Buffer.from(''));

    expect(t).toThrow(HttpException);
  });

  it('should convert line to transaction successfully', async () => {
    const buffer = readFileSync(
      join(__dirname, '../../assets/sales-test-ok.txt'),
    );

    const lines = service.getLines(buffer);

    const { transactions } = await service.toTransactionList(lines);

    expect(transactions.length).toBeGreaterThan(0);

    transactions.forEach((transaction) => {
      for (const key in transaction) {
        expect(transaction[key]).toBeTruthy();
      }
    });
  });

  it('should get errors and convert line to transaction', async () => {
    const buffer = readFileSync(
      join(__dirname, '../../assets/sales-test-with-errors.txt'),
    );

    const lines = service.getLines(buffer);

    const { transactions, errorByLine } = await service.toTransactionList(
      lines,
    );

    expect(errorByLine['1'][0].constraints.isDate).toBe('data inválida');
    expect(errorByLine['2'][0].constraints.isNotEmpty).toBe('produto inválido');
    expect(errorByLine['3'][0].constraints.isNumber).toBe('valor inválido');
    expect(errorByLine['4'][0].constraints.line).toBe('é menor do que 67');
    expect(errorByLine['5'][0].constraints.isIn).toBe('tipo inválido');
    expect(transactions.length).toBe(15);
  });

  it('get transactions without group id', async () => {
    prisma.transaction.findMany = jest.fn().mockReturnValueOnce(transactions);
    const amount = transactions.reduce((acc, t) => (acc += t.amount), 0);
    prisma.transaction.aggregate = jest.fn().mockReturnValueOnce({
      _sum: {
        amount,
      },
    });
    const response = await service.getTransactions();
    expect(response.total).toBe(amount);
    expect(response.transactions.length).toBe(2);
  });
});
