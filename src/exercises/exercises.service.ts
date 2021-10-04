import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicCrud } from 'src/abstractClasses/basicCrudOperations';
import { CoolUpExercises } from 'src/entities/coolUpExercises.entity';
import { Exercises } from 'src/entities/exercises.entity';
import { WarmUpExercises } from 'src/entities/warmUpExercises.entity';
import { WorkoutExercises } from 'src/entities/workoutExercises.entity';
import { dayCreateDto } from 'src/owner-trainer/dayCreate.dto';
import { searchUserDateDto } from 'src/owner-trainer/searchUserDate.dto';
import { Repository } from 'typeorm';
import Pusher from 'pusher';
import { Clients } from 'src/entities/clients.entity';
import { ClientService } from 'src/client/clients.service';
import { UserService } from 'src/users/users.service';
import { roles } from 'src/seeds/roles.seed';
import { Request } from 'express';

@Injectable()
export class ExercisesService extends BasicCrud {
  constructor(
    @InjectRepository(Exercises)
    private readonly exercisesRepository: Repository<Exercises>,
    @InjectRepository(WarmUpExercises)
    private readonly warmUpExercisesRepository: Repository<WarmUpExercises>,
    @InjectRepository(WorkoutExercises)
    private readonly workOutExercisesRepository: Repository<WorkoutExercises>,
    @InjectRepository(CoolUpExercises)
    private readonly coolUpExercisesRepository: Repository<CoolUpExercises>,
    private readonly clientsService: ClientService,
    private readonly usersService: UserService,
  ) {
    super();
  }

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
    const takeExercise = {
      user: exerciseData.user,
      date: exerciseData.exercise.date,
    };

    return await this.find(takeExercise);
  }

  async update(exerciseData: Exercises) {
    const exercise = await this.exercisesRepository.update(
      { user: exerciseData.user, date: exerciseData.date },
      exerciseData,
    );

    const client = await this.clientsService.getClientbyUser(exerciseData.user);
    this.alertTrainer(client);
    return exercise;
  }

  async find(data: searchUserDateDto): Promise<Exercises> {
    return await this.exercisesRepository.findOne({
      where: { user: data.user, date: data.date },
      relations: ['warmUpExercises', 'workoutExercises', 'coolUpExercises'],
    });
  }

  delete() {
    //nothing
  }

  alertTrainer(client: Clients) {
    const pusherConnection = new Pusher({
      appId: `${process.env.PUSHER_APPID}`,
      key: `${process.env.PUSHER_KEY}`,
      secret: `${process.env.PUSHER_SECRET}`,
      cluster: `${process.env.PUSHER_CLUSTER}`,
    });

    pusherConnection.trigger('users', `updateDay-${client.trainer}`, {
      user: client.user,
    });
  }
}
