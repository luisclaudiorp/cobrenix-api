import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSingleSalesDto {
  @IsString()
  name: string;

  @IsNumber()
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
