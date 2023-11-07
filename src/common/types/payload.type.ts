import { IsNotEmpty, IsString } from 'class-validator';

export class Payload {
  @IsString()
  @IsNotEmpty()
  sub: string;
}
