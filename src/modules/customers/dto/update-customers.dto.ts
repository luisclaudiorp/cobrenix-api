import { IsOptional, IsString } from 'class-validator';

export class UpdateCustomersDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsOptional()
  @IsString()
  repetedPassword: string;

  @IsOptional()
  @IsString()
  lastPassword: string;
}
