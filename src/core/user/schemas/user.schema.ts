import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Role } from '../../../common';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, index: true })
  _id: string;

  @Prop({ unique: true, required: true, minlength: 5, maxlength: 25 })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: [Role.User, Role.Admin], default: Role.User })
  role: string;

  @Prop({ required: false, default: null })
  refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
