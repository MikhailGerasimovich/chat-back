import { IsDefined, IsOptional, IsString } from 'class-validator';

export class FindAllUserDto {
  @IsString()
  @IsOptional()
  @IsDefined()
  username?: string;
}
