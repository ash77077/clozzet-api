import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
