import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  clientName: string;
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
  @IsNumber()
  employeeCount: number;
  @IsNumber()
  quantity: number;
  @IsString()
  productType: string;
  @IsString()
  company: string;
  @IsString()
  message: string;
}
