import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/client/clients.module';
import { Clients } from 'src/entities/clients.entity';
import { CoolUpExercises } from 'src/entities/coolUpExercises.entity';
import { Exercises } from 'src/entities/exercises.entity';
import { WarmUpExercises } from 'src/entities/warmUpExercises.entity';
import { WorkoutExercises } from 'src/entities/workoutExercises.entity';
import { UserModule } from 'src/users/users.module';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Exercises,
      WarmUpExercises,
      WorkoutExercises,
      CoolUpExercises,
    ]),
    ClientModule,
    UserModule,
  ],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
