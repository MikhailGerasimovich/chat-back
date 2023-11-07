import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { JwtModule } from '../jwt/jwt.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
