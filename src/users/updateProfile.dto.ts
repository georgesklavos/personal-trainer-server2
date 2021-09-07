import { IsDefined } from 'class-validator';
import { Clients } from 'src/entities/clients.entity';
import { Owners } from 'src/entities/owners.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';

export class updateProfileDto {
  @IsDefined()
  user: Users;
  @IsDefined()
  role: Clients | Trainers | Owners;
}
