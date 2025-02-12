import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateSingleSalesDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  discount: number;

  @IsNumber({}, { each: true })
  @IsOptional()
  productIds: number[];

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
