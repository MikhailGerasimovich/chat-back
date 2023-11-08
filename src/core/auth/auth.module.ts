import { Module } from '@nestjs/common';

import { JwtStrategy } from './../../common';

import { UserModule } from '../user/user.module';
import { JwtModule } from '../jwt/jwt.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RefreshStrategy } from './strategies';

@Module({
  imports: [UserModule, JwtModule],
  providers: [AuthService, RefreshStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
