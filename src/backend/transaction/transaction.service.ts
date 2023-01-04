import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction } from './types';
import { validate, ValidationError } from 'class-validator';
import { PrismaService } from 'src/prisma.service';

const MINIMUM_LINE_LENGTH = 67;

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(file: Express.Multer.File): Promise<TnasactionCreateResponse> {
    const lines = this.getLines(file.buffer);
    const { transactions, errorByLine } = await this.toTransactionList(lines);

    let numberOfTransactionsProcesseds = 0;
    if (transactions.length > 0) {
      numberOfTransactionsProcesseds = await this.saveTransactions(
        numberOfTransactionsProcesseds,
        transactions,
      );
    }
    return {
      errors: errorByLine,
      created: numberOfTransactionsProcesseds,
    };
  }

  private async saveTransactions(
    numberOfTransactionsProcesseds: any,
    transactions: any[],
  ) {
    numberOfTransactionsProcesseds = await this.prisma.transaction
      .createMany({
        data: transactions,
      })
      .then((p) => p.count);
    return numberOfTransactionsProcesseds;
  }

  async toTransactionList(lines: string[]) {
    const errorByLine: Record<number, ValidationError[]> = {};
    let index = 1;
    const transactions = [];
    for (const line of lines) {
      if (line.length < MINIMUM_LINE_LENGTH) {
        errorByLine[index] = this.buildValidationErrorForLineLength();
        index++;
        continue;
      }
      const transaction = this.toTransaction(line);

      const errors = await validate(transaction, { always: true });

      if (errors?.length > 0) {
        errorByLine[index] = errors;
      } else {
        transactions.push(transaction);
      }
      index++;
    }
    return { transactions, errorByLine };
  }

  private buildValidationErrorForLineLength(): ValidationError[] {
    return [
      {
        property: 'line',
        constraints: { line: `é menor do que ${MINIMUM_LINE_LENGTH}` },
      },
    ];
  }

  private toTransaction(line: string) {
    const transaction = new Transaction();

    transaction.type = getType(line);
    transaction.date = getDate(line);
    transaction.product = getProduct(line);
    transaction.amount = getAmount(line);
    transaction.seller = getPartner(line);
    return transaction;
  }

  getLines(file: Buffer) {
    const dataAsString = file.toString('utf8');

    if (!dataAsString) {
      throw new HttpException('O arquivo esta vazio', HttpStatus.BAD_REQUEST);
    }

    return dataAsString.split('\n').filter((line) => line);
  }
}

type TransactionLine = (line: string) => any;
type ErrorByLine = { [line: number]: ValidationError[] };
type TnasactionCreateResponse = {
  created: number;
  errors: ErrorByLine;
};
const getType: TransactionLine = (line) => Number(line.slice(0, 1));
const getDate: TransactionLine = (line) => new Date(line.slice(1, 20));
const getProduct: TransactionLine = (line) => line.slice(26, 56).trim();
const getAmount: TransactionLine = (line) => Number(line.slice(56, 66));
const getPartner: TransactionLine = (line) => line.slice(66).trim();
