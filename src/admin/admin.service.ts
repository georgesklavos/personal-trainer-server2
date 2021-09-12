import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/clients.service';
import { Clients } from 'src/entities/clients.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';
import { OwnerService } from 'src/owner/owner.service';
import { roles } from 'src/seeds/roles.seed';
import { TrainerService } from 'src/trainer/trainer.service';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly trainersService: TrainerService,
    private readonly clientsService: ClientService,
    private readonly ownersService: OwnerService,
  ) {}

  async getUsers(data): Promise<[Users[], number]> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.role = :id', { id: data.role })
      .andWhere(
        new Brackets((qb) => {
          qb.where('user.firstname like :search', {
            search: `%${data.search}%`,
          })
            .orWhere('user.lastName like :search', {
              search: `%${data.search}%`,
            })
            .orWhere('user.email like :search', {
              search: `%${data.search}%`,
            });
        }),
      )
      .getManyAndCount();
  }

  async getRoleInfo(data: Users) {
    let roleInfo;
    if (data.role.id == roles.Client) {
      this.clientsService.getClientbyUser(data);
    } else if (data.role.id == roles.Trainer) {
      this.trainersService.findTrainerByUserId(data);
    } else if (data.role.id == roles.Owner) {
      this.ownersService.findOwnerByUserId(data);
    }
    return roleInfo;
  }
}
