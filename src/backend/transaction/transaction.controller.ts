import {
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionService } from './transaction.service';

import { GetAllTransactionsParams, GetAllTransactionsResponse } from './types';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  createTransaction(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'text/plain',
        })
        .addMaxSizeValidator({
          maxSize: 5000,
        })

        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new UnprocessableEntityException('O arquivo é obrigatório.');
    }

    return this.transactionService.create(file);
  }

  @Get()
  @ApiQuery({
    type: 'number',
    name: 'group',
    required: false,
  })
  getTransactions(
    @Query()
    query: GetAllTransactionsParams,
  ): Promise<GetAllTransactionsResponse> {
    return this.transactionService.getTransactions(Number(query.group));
  }
}
