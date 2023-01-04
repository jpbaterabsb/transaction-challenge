import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  providers: [TransactionService, PrismaService],
  controllers: [TransactionController],
})
export class BackendModule {}
