import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Clients } from 'src/entities/clients.entity';
import { Levels } from 'src/entities/levels.entity';
import { Owners } from 'src/entities/owners.entity';
import { Programs } from 'src/entities/programs.entity';
import { Targets } from 'src/entities/targets.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Clients)
    private readonly clientsRepository: Repository<Clients>,
  ) {}

  async createClient(
    user: Users,
    owner: Owners,
    age: number,
    level: Levels,
    active: boolean,
    payment: boolean,
    program: Programs,
    lastWeightNumber: number,
    heightNumber: number,
    target: Targets,
    startDate: Date,
    endDate: Date,
    notes: string,
    trainer: Trainers,
    viewedByTrainer: boolean,
  ): Promise<Clients> {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const newClient = await this.clientsRepository.create({
      user,
      owner,
      age,
      level,
      active,
      payment,
      program,
      lastWeightNumber,
      heightNumber,
      target,
      startDate,
      endDate,
      notes,
      trainer,
      viewedByTrainer,
    });

    await validate(newClient).catch((errors) => {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid client information',
        },
        HttpStatus.BAD_REQUEST,
      );
    });

    return await this.clientsRepository.save(newClient);
  }

  async getClients(ownerId: Owners): Promise<Clients[]> {
    return await this.clientsRepository.find({ owner: ownerId });
  }
}
