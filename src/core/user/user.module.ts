import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtStrategy } from '../../common';

import { User, UserSchema } from './schemas';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
