import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Levels } from 'src/entities/levels.entity';
import { Owners } from 'src/entities/owners.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainers)
    private readonly trainersRepository: Repository<Trainers>,
  ) {}

  async createTrainer(
    user: Users,
    owner: Owners,
    age: number,
    level: Levels,
    active: boolean,
    verifyPayments: boolean,
    paymentNumber: number,
    notes: string,
    clientsNumber: number,
  ): Promise<Trainers> {
    const newTrainer = await this.trainersRepository.create({
      user,
      owner,
      age,
      level,
      active,
      verifyPayments,
      paymentNumber,
      notes,
      clientsNumber,
    });

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
}
