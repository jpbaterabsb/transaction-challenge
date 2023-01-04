import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BackendModule } from 'src/backend/backend.module';
import { PrismaService } from 'src/prisma.service';
import { join } from 'path';
import { transactions } from './transactions.mock';

describe('Transaction', () => {
  let app: INestApplication;
  const prismaService = {
    transaction: {
      createMany: async (list) => {
        return { count: list.data.length };
      },
      findMany: async ({ where }) =>
        transactions.filter((t) => t.type === where.type),
      aggregate: async ({ where }) => ({
        _sum: {
          amount: transactions
            .filter((t) => t.type === where.type)
            .reduce((a, t) => (a += t.amount), 0),
        },
      }),
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackendModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST create transactions with a file without errors`, () => {
    return request(app.getHttpServer())
      .post('/transactions')
      .attach('file', join(__dirname, '../src/assets/sales.txt'), {
        contentType: 'text/plain',
      })
      .expect(201, { errors: {}, created: 20 });
  });

  it(`/POST transactions with a file without errors`, () => {
    return request(app.getHttpServer())
      .post('/transactions')
      .attach('file', join(__dirname, '../src/assets/sales.txt'), {
        contentType: 'text/plain',
      })
      .expect(201, { errors: {}, created: 20 });
  });

  it(`/POST should fail when a json file is uploaded`, () => {
    return request(app.getHttpServer())
      .post('/transactions')
      .attach('file', join(__dirname, '../src/assets/test.json'), {
        contentType: 'application/json',
      })
      .expect(422);
  });

  it(`/POST should fail when a json file greater than 5 MB`, () => {
    return request(app.getHttpServer())
      .post('/transactions')
      .attach('file', join(__dirname, '../src/assets/big-file.txt'), {
        contentType: 'text/plain',
      })
      .then((r) => console.log(r.body));
  });

  it(`/GET transactions with group`, () => {
    return request(app.getHttpServer())
      .get('/transactions?group=1')
      .expect(200)
      .then((r) => expect(r.body.total).toBe(640500));
  });

  afterAll(async () => {
    await app.close();
  });
});