import { IsArray, IsDefined, IsInt, Min } from 'class-validator';
import { Users } from 'src/entities/users.entity';

export class searchResultDto {
  @IsDefined()
  @IsArray()
  /**
   * Search result
   */
  result: Users[];

  @IsDefined()
  @IsInt()
  @Min(1)
  size: number;

  @IsDefined()
  @IsInt()
  @Min(0)
  page: number;

  @IsDefined()
  @IsInt()
  @Min(0)
  totalPages: number;

  @IsDefined()
  @IsInt()
  @Min(0)
  total: number;
}
