import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductsDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsNumber()
  value: number;

  @IsOptional()
  @IsNumber()
  companyId: number;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}