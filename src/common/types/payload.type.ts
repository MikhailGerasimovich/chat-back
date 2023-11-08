import { IsNotEmpty, IsString } from 'class-validator';

export class Payload {
  @IsString()
  @IsNotEmpty()
  sub: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
