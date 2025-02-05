import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllCustomersDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  id: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  companyId: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : false))
  active: boolean;
}
