import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let user: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    user = module.get<UsersService>(UsersService);
  });

  it('should return null when user is not found', async () => {
    user.findOne = jest.fn().mockResolvedValueOnce(null);
    const response = await service.validateUser('admin1', '123');
    expect(response).toBeNull();
  });

  it('should return null when password is invalid', async () => {
    user.findOne = jest
      .fn()
      .mockResolvedValueOnce({ username: 'admin', password: 'xxxxx' });
    const response = await service.validateUser('admin1', '123');
    expect(response).toBeNull();
  });

  it('should return user when password is correct', async () => {
    user.findOne = jest.fn().mockResolvedValueOnce({
      username: 'admin',
      password: '$2b$10$0fZTGo73Xaw/7QOFHuZChug4iX.rLnVWMkgp1CeuNwUoLdl6ztx6m',
    });
    const response = await service.validateUser('admin', '123456');
    expect(response.username).toBe('admin');
  });
});
