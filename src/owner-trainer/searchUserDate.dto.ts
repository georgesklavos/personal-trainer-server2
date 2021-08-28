import { IsDefined } from 'class-validator';
import { Users } from 'src/entities/users.entity';

export class searchUserDateDto {
  @IsDefined()
  user: Users;
  @IsDefined()
  date: Date;
}
