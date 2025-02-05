import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomersDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  repetedPassword: string;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}
