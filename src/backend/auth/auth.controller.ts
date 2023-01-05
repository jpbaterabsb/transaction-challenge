import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginRequest } from './types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginRequest: LoginRequest) {
    return this.authService.login(loginRequest as User);
  }
}
