import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    TransactionService,
    PrismaService,
    AuthService,
    UsersService,
    LocalStrategy,
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [TransactionController],
})
export class BackendModule {}
