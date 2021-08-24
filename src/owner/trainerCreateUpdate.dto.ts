import { IsDefined } from 'class-validator';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';

export class trainerCreateUpdateDto {
  @IsDefined()
  user: Users;
  @IsDefined()
  trainer: Trainers;
}
