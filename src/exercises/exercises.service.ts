import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoolUpExercises } from 'src/entities/coolUpExercises.entity';
import { Exercises } from 'src/entities/exercises.entity';
import { WarmUpExercises } from 'src/entities/warmUpExercises.entity';
import { WorkoutExercises } from 'src/entities/workoutExercises.entity';
import { dayCreateDto } from 'src/owner-trainer/dayCreate.dto';
import { searchUserDateDto } from 'src/owner-trainer/searchUserDate.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercises)
    private readonly exercisesRepository: Repository<Exercises>,
    @InjectRepository(WarmUpExercises)
    private readonly warmUpExercisesRepository: Repository<WarmUpExercises>,
    @InjectRepository(WorkoutExercises)
    private readonly workOutExercisesRepository: Repository<WorkoutExercises>,
    @InjectRepository(CoolUpExercises)
    private readonly coolUpExercisesRepository: Repository<CoolUpExercises>,
  ) {}

  async create(exerciseData: dayCreateDto) {
    exerciseData.exercise.date = new Date(exerciseData.exercise.date);
    const newExercise = await this.exercisesRepository.create(
      exerciseData.exercise,
    );
    await this.exercisesRepository.save(newExercise);

    for (const warmUp of exerciseData.warmUpExercises) {
      warmUp.exercise = newExercise;
      const newWarmUp = await this.warmUpExercisesRepository.create(warmUp);
      await this.warmUpExercisesRepository.save(newWarmUp);
    }

    for (const workOut of exerciseData.workoutExercises) {
      workOut.exercise = newExercise;
      const newWorkOut = this.workOutExercisesRepository.create(workOut);
      this.workOutExercisesRepository.save(newWorkOut);
    }

    for (const coolUp of exerciseData.coolUpExercises) {
      coolUp.exercise = newExercise;
      const newCoolUp = this.coolUpExercisesRepository.create(coolUp);
      this.coolUpExercisesRepository.save(newCoolUp);
    }

    return;
  }

  async update(exerciseData: Exercises) {
    return await this.exercisesRepository.update(
      { user: exerciseData.user, date: exerciseData.date },
      exerciseData,
    );
  }

  async findOne(data: searchUserDateDto): Promise<Exercises> {
    return await this.exercisesRepository.findOne({
      user: data.user,
      date: data.date,
    });
  }
}
