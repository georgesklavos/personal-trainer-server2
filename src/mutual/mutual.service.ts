import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { Systems } from 'src/entities/systems.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MutualService {
  constructor(
    @InjectRepository(Systems)
    private readonly systemsRepository: Repository<Systems>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async getTypes() {
    const typesToSearch = [this.systemsRepository, this.rolesRepository];
    // eslint-disable-next-line prefer-const
    let typesTable = {};

    await Promise.all(
      typesToSearch.map(async (el) => {
        typesTable[el.metadata.tableName] = await el.find();
      }),
    );

    return typesTable;
  }
}
