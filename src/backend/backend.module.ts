import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  providers: [
    TransactionService,
    PrismaService,
    AuthService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [TransactionController, AuthController],
})
export class BackendModule {}
