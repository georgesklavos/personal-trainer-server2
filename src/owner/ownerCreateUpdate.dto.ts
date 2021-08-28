import { IsDefined } from 'class-validator';
import { Owners } from 'src/entities/owners.entity';
import { Users } from 'src/entities/users.entity';

export class ownerCreateUpdateDto {
  @IsDefined()
  user: Users;
  @IsDefined()
  owner: Owners;
}
