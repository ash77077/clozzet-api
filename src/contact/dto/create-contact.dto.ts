import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  message: string;

  @IsString()
  @MinLength(2)
  phone: string;

  @IsString()
  @MinLength(2)
  company: string;
}
