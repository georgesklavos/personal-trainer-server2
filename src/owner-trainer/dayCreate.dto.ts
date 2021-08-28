import { isDefined, IsDefined } from 'class-validator';
import { CoolUpExercises } from 'src/entities/coolUpExercises.entity';
import { Exercises } from 'src/entities/exercises.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';
import { WarmUpExercises } from 'src/entities/warmUpExercises.entity';
import { WorkoutExercises } from 'src/entities/workoutExercises.entity';

export class dayCreateDto {
  @IsDefined()
  user: Users;
  @IsDefined()
  trainer: Trainers;
  @IsDefined()
  exercise: Exercises;
  @IsDefined()
  warmUpExercises: WarmUpExercises[];
  @IsDefined()
  workoutExercises: WorkoutExercises[];
  @IsDefined()
  coolUpExercises: CoolUpExercises[];
}
