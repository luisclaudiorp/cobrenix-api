import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}
