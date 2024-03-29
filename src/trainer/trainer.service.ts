import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { BasicCrud } from 'src/abstractClasses/basicCrudOperations';
import { Owners } from 'src/entities/owners.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainerService extends BasicCrud {
  constructor(
    @InjectRepository(Trainers)
    private readonly trainersRepository: Repository<Trainers>,
  ) {
    super();
  }

  async create(trainerData: Trainers): Promise<Trainers> {
    const newTrainer = await this.trainersRepository.create(trainerData);

    await validate(newTrainer).catch((errros) => {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid trainer information',
        },
        HttpStatus.BAD_REQUEST,
      );
    });

    return await this.trainersRepository.save(newTrainer);
  }

  async find(ownerId: Owners): Promise<Trainers[]> {
    return await this.trainersRepository.find({
      where: { owner: ownerId },
      relations: ['user'],
    });
  }

  async findTrainerByUserId(userId: Users): Promise<Trainers> {
    const trainer = await this.trainersRepository.findOne({ user: userId });

    return trainer;
  }

  async update(trainerData: Trainers) {
    try {
      const trainer = this.trainersRepository.update(
        { user: trainerData.user },
        trainerData,
      );
      return trainer;
    } catch (err) {
      console.log(err);
    }
  }

  delete() {
    //nothing
  }
}
