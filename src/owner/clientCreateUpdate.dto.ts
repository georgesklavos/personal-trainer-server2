import { IsDefined } from 'class-validator';
import { Clients } from 'src/entities/clients.entity';
import { Users } from 'src/entities/users.entity';

export class clientCreateUpdateDto {
  @IsDefined()
  user: Users;
  @IsDefined()
  client: Clients;
}
