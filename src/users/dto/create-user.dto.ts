import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { EUserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(EUserRole)
  role?: EUserRole;
}
