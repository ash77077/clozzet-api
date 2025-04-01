import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { EUserRole } from 'src/users/enums/user-role.enum';

export class RegisterDto {
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
