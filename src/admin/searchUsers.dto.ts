import { IsDefined, IsInt } from 'class-validator';

export class searchUsersDto {
  @IsDefined()
  role: number | null;
  @IsDefined()
  search: string;
  @IsDefined()
  @IsInt()
  take: number;
  @IsDefined()
  @IsInt()
  skip: number;
}
