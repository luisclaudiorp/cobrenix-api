import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSingleSalesDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsNumber({}, { each: true })
  @IsOptional()
  productIds: number[];

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
