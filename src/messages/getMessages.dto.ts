import { IsDefined } from 'class-validator';
import { SupportChats } from 'src/entities/supportChats.entity';
import { Users } from 'src/entities/users.entity';

export class getMessagesDto {
  @IsDefined()
  user: Users;
  @IsDefined()
  chat: SupportChats;
}
