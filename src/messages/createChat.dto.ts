import { IsDefined } from 'class-validator';
import { Users } from 'src/entities/users.entity';

export class createChatDto {
  @IsDefined()
  supportUser: Users;

  @IsDefined()
  user: Users;
}
