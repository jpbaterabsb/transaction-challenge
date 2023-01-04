import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionController', () => {
  let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService, PrismaService],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should throw exception when file is null', () => {
    expect(() => controller.createTransaction(null)).toThrow(
      new UnprocessableEntityException('O arquivo é obrigatório.'),
    );
  });
});
