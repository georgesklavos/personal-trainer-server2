import { IsDefined } from 'class-validator';
import { Exercises } from 'src/entities/exercises.entity';
import { Macros } from 'src/entities/macros.entity';
import { Users } from 'src/entities/users.entity';

export class dayCreateUpdateDto {
  @IsDefined()
  macros: Macros;
  @IsDefined()
  user: Users;
  @IsDefined()
  exercise: Exercises;
}
