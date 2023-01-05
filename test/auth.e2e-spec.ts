import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { BackendModule } from 'src/backend/backend.module';
import { PrismaService } from 'src/prisma.service';

describe('/auth/login', () => {
  let app: INestApplication;
  const prismaService = {
    user: {
      findUnique: ({ where }) => {
        return [
          {
            id: 1,
            username: 'admin',
            password:
              '$2b$10$0fZTGo73Xaw/7QOFHuZChug4iX.rLnVWMkgp1CeuNwUoLdl6ztx6m',
          },
        ].find((u) => u.username === where.username);
      },
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
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`/POST log in with an empty username and password`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({})
      .expect(400, {
        errors: [
          {
            target: {},
            property: 'username',
            children: [],
            constraints: { isNotEmpty: 'username nao pode ser vazio' },
          },
          {
            target: {},
            property: 'password',
            children: [],
            constraints: { isNotEmpty: 'password nao pode ser vazio' },
          },
        ],
      });
  });

  it(`/POST log in with an empty password`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin' })
      .expect(400, {
        errors: [
          {
            target: {
              username: 'admin',
            },
            property: 'password',
            children: [],
            constraints: {
              isNotEmpty: 'password nao pode ser vazio',
            },
          },
        ],
      });
  });

  it(`/POST log in with a wrong password`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: '654322' })
      .expect(401, { statusCode: 401, message: 'Unauthorized' });
  });

  it(`/POST log in with a existing user`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: '123456' })
      .expect(200)
      .then((r) => expect(r.body.access_token).not.toBeNull());
  });

  afterAll(async () => {
    await app.close();
  });
});
