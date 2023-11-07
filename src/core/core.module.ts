import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [UserModule, AuthModule, JwtModule],
})
export class CoreModule {}
