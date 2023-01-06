import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { validateSync } from 'class-validator';
import { LoginRequest } from './types';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   *  Validate payload's shape and validate credentials againts user data from database.
   */
  authenticate(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    options?: any,
  ): void {
    const loginRequest = new LoginRequest();

    loginRequest.username = req.body.username;
    loginRequest.password = req.body.password;

    const errors = validateSync(loginRequest);

    if (errors.length > 0) {
      this.error(new BadRequestException({ errors }));
    }

    super.authenticate(req, options);
  }

  /**
   *  Validate if username and password matches with some registered user else trhows an UnauthorizedException.
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
