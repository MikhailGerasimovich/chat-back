import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
