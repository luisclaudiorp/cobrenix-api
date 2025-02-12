import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateCompaniesDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsObject()
  config: object;
}
