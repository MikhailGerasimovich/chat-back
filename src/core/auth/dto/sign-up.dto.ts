import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(5)
  password: string;
}
