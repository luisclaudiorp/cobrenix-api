import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompaniesDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
