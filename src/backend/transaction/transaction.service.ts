import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetAllTransactionsResponse, Transaction } from './types';
import { validate, ValidationError } from 'class-validator';
import { PrismaService } from 'src/prisma.service';

const MINIMUM_LINE_LENGTH = 67;

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get transactions filtered by group if group is null this method will return all transactions from database.
   */
  async getTransactions(groupId?: number): Promise<GetAllTransactionsResponse> {
    let where: any = {};

    if (groupId) {
      where = {
        type: groupId,
      };
    }

    const transactions = await this.prisma.transaction.findMany({
      include: {
        transactionType: true,
      },
      where,
    });
    const total = await this.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where,
    });

    return { transactions, total: total?._sum?.amount };
  }

  /**
   * Read a file and register data on database.
   */
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

  /**
   * Register transactions on database.
   */
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

  /**
   * Convert lines to transactionList and the lines which contain some error is added in a list of error.
   */
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

  /**
   * Convert a single line to transaction
   */
  private toTransaction(line: string) {
    const transaction = new Transaction();

    transaction.type = getType(line);
    transaction.date = getDate(line);
    transaction.product = getProduct(line);
    transaction.amount = getAmount(line);
    transaction.seller = getPartner(line);
    return transaction;
  }

  /**
   * Convert file to an array of lines.
   */
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

/**
 * Type parser
 */
const getType: TransactionLine = (line) => Number(line.slice(0, 1));

/**
 * Type date
 */
const getDate: TransactionLine = (line) => new Date(line.slice(1, 20));

/**
 * Type Product
 */
const getProduct: TransactionLine = (line) => line.slice(26, 56).trim();

/**
 * Type Amount
 */
const getAmount: TransactionLine = (line) => Number(line.slice(56, 66));

/**
 * Type Amount
 */
const getPartner: TransactionLine = (line) => line.slice(66).trim();
