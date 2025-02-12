import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateSingleSalesDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @IsArray()
  productIds: number[];
}
