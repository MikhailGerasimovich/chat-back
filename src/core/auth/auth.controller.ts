import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { Cookie, setCookie } from '../../common';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const jwts = await this.authService.signUp(signUpDto);
    setCookie(res, Cookie.Auth, jwts);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const jwts = await this.authService.signIn(signInDto);
    setCookie(res, Cookie.Auth, jwts);
  }
}
