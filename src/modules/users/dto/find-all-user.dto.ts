import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  id: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : false))
  active: boolean;
}
