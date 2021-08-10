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

  async createClient(clientData: Clients): Promise<Clients> {
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

  async getClientsTrainer(trainerId: Trainers): Promise<Clients[]> {
    return await this.clientsRepository.find({
      where: { trainer: trainerId },
      relations: ['user'],
    });
  }

  async updateClient(userId: Users, clientData) {
    try {
      const client = this.clientsRepository.update(
        { user: userId },
        clientData,
      );
      return client;
    } catch (err) {
      console.log(err);
    }
  }
}
