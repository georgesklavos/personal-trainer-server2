import { isDefined, IsDefined } from 'class-validator';
import { CoolUpExercises } from 'src/entities/coolUpExercises.entity';
import { ExerciseModes } from 'src/entities/exerciseModes.entity';
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
  exercise: Exercises;
  @IsDefined()
  date: Date;
  @IsDefined()
  exerciseMode: ExerciseModes;
  @IsDefined()
  warmUpExercises: WarmUpExercises[];
  @IsDefined()
  workoutExercises: WorkoutExercises[];
  @IsDefined()
  coolUpExercises: CoolUpExercises[];
}
