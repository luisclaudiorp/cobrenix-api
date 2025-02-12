import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllSingleSalesDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  customerId: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  companyId: number;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  productIds: number[];

  @IsOptional()
  @IsNumber()
  value: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  active: boolean;
}
