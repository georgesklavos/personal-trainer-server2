import {
  IsDefined,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Roles } from '../entities/roles.entity';

export class settingsSearchDto {
  @IsOptional()
  role: Roles;

  @IsOptional()
  @IsString()
  search = '';

  @IsOptional()
  @IsInt()
  @Min(1)
  limit = 10;

  @IsOptional()
  @IsInt()
  @Min(0)
  page = 0;
}
