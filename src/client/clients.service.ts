import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { BasicCrud } from 'src/abstractClasses/basicCrudOperations';
import { Clients } from 'src/entities/clients.entity';
import { Levels } from 'src/entities/levels.entity';
import { Owners } from 'src/entities/owners.entity';
import { Programs } from 'src/entities/programs.entity';
import { Targets } from 'src/entities/targets.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class ClientService extends BasicCrud {
  constructor(
    @InjectRepository(Clients)
    private readonly clientsRepository: Repository<Clients>,
  ) {
    super();
  }

  async create(clientData: Clients): Promise<Clients> {
    clientData.startDate = new Date(clientData.startDate);
    clientData.endDate = new Date(clientData.endDate);
    const newClient = await this.clientsRepository.create(clientData);

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

  async getClientsOwner(ownerId: Owners): Promise<Clients[]> {
    return await this.clientsRepository.find({
      where: { owner: ownerId },
      relations: ['user'],
    });
  }

  async getClientbyUser(user: Users): Promise<Clients> {
    return await this.clientsRepository.findOne({ user });
  }

  async getClientsTrainer(trainerId: Trainers): Promise<Clients[]> {
    return await this.clientsRepository.find({
      where: { trainer: trainerId },
      relations: ['user'],
      select: [
        'user',
        'owner',
        'age',
        'level',
        'program',
        'payment',
        'lastWeightNumber',
        'heightNumber',
        'target',
        'startDate',
        'endDate',
        'notes',
        'viewedByTrainer',
      ],
    });
  }

  async update(clientData: Clients) {
    try {
      const client = this.clientsRepository.update(
        { user: clientData.user },
        clientData,
      );
      return client;
    } catch (err) {
      console.log(err);
    }
  }

  async viewedByTrainer(user: Users) {
    try {
      return await this.clientsRepository.update(
        { user },
        { viewedByTrainer: true },
      );
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid client information',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  find() {
    console.log('est');
  }

  delete() {
    console.log('delete');
  }
}
