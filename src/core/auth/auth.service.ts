import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { Payload } from './../../common';

import { UserService } from '../user/user.service';
import { User } from '../user/schemas';
import { JwtService } from '../jwt/jwt.service';
import { SignInDto, SignUpDto } from './dto';
import { JwtResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<JwtResponse> {
    const { username, password } = signUpDto;
    const existing = await this.userService.findByUsername(username);
    if (existing) {
      throw new BadRequestException('User with this username already exists');
    }

    const hashPassword = await hash(password, 10);
    const user = await this.userService.create({
      username,
      password: hashPassword,
    });

    const jwts = await this.generateJwts(user._id, user.role);
    await this.userService.setRefreshToken(user._id, jwts.refreshToken);
    return jwts;
  }

  async signIn(signInDto: SignInDto): Promise<JwtResponse> {
    const { username, password } = signInDto;
    const user = await this.validateSignIn(username, password);

    const jwts = await this.generateJwts(user._id, user.role);
    await this.userService.setRefreshToken(user._id, jwts.refreshToken);
    return jwts;
  }

  async logout(payload: Payload): Promise<void> {
    await this.userService.setRefreshToken(payload.sub, null);
  }

  async refreshTokens(payload: Payload, refreshToken: string): Promise<JwtResponse> {
    const isValidToken = await this.jwtService.verifyRefreshJwt(refreshToken);
    if (!isValidToken) {
      await this.userService.setRefreshToken(payload.sub, null);
      throw new UnauthorizedException('Refresh token is not vaalid');
    }

    const user = await this.userService.findById(payload.sub);
    if (user.refreshToken != refreshToken) {
      await this.userService.setRefreshToken(payload.sub, null);
      throw new UnauthorizedException('Refresh token is not vaalid');
    }

    const jwts = await this.generateJwts(user._id, user.role);
    await this.userService.setRefreshToken(user._id, jwts.refreshToken);
    return jwts;
  }

  private async validateSignIn(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Incorrect username or password entered');
  }

  private async generateJwts(userId: string, userRole: string): Promise<JwtResponse> {
    const payload = { sub: userId, role: userRole };
    const accessToken = await this.jwtService.generateAccessJwt(payload);
    const refreshToken = await this.jwtService.generateRefreshJwt(payload);
    return { accessToken, refreshToken };
  }
}
