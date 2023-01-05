import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should find a single user', async () => {
    prisma.user.findUnique = jest
      .fn()
      .mockReturnValueOnce({ id: 1, username: 'admin', password: '123456' });
    const response = await service.findOne('admin');
    expect(response.username).toBe('admin');
    expect(response.password).toBe('123456');
    expect(response.id).toBe(1);
  });
});
