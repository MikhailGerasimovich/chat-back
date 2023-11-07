import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

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

    const jwts = await this.generateJwts(user._id);
    return jwts;
  }

  async signIn(signInDto: SignInDto): Promise<JwtResponse> {
    const { username, password } = signInDto;
    const user = await this.validateSignIn(username, password);

    const jwts = await this.generateJwts(user._id);
    return jwts;
  }

  private async validateSignIn(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Incorrect username or password entered');
  }

  private async generateJwts(userId: string): Promise<JwtResponse> {
    const payload = { sub: userId };
    const accessToken = await this.jwtService.generateAccessJwt(payload);
    const refreshToken = await this.jwtService.generateRefreshJwt(payload);
    return { accessToken, refreshToken };
  }
}
