import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSingleSalesDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;

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
  productIds: number[];
}
