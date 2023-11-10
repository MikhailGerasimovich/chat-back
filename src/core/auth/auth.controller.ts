import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { Cookie, GetPayload, JwtAuthGuard, Payload, setCookie } from '../../common';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { GetToken } from './decorators';
import { RefreshGuard } from './guards';

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

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(
    @GetPayload() payload: Payload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.authService.logout(payload);
    setCookie(res, Cookie.Auth, null);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  async refreshTokens(
    @GetPayload() payload: Payload,
    @GetToken() refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const jwts = await this.authService.refreshTokens(payload, refreshToken);
    setCookie(res, Cookie.Auth, jwts);
  }
}
