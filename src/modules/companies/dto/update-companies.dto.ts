import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCompaniesDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
