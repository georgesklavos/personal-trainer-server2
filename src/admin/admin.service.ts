import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/clients.service';
import { Clients } from 'src/entities/clients.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';
import { OwnerService } from 'src/owner/owner.service';
import { searchResultDto } from 'src/search classes/searchResult.dto';
import { settingsSearchDto } from 'src/search classes/searchSettings.dto';
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

  //make search work anywhere
  async getUsers(data: settingsSearchDto): Promise<searchResultDto> {
    console.log(data);
    const [result, total] = await this.usersRepository
      .createQueryBuilder('user')
      .orWhere(
        new Brackets((qb) => {
          qb.orWhere('user.firstName like :search', {
            search: data.search ? `%${data.search}%` : '',
          })
            .orWhere('user.lastName like :search', {
              search: data.search ? `%${data.search}%` : '',
            })
            .orWhere('user.email like :search', {
              search: data.search ? `%${data.search}%` : '',
            })
            .orWhere('user.roleId = :id', { id: data.role });
        }),
      )
      .take(data.limit)
      .skip(data.page * data.limit)
      .getManyAndCount();

    return {
      result,
      size: data.limit,
      totalPages: total / data.limit,
      page: data.page + 1,
      total,
    };
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
