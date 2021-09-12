import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extend } from 'dayjs';
import { BasicCrud } from 'src/abstractClasses/basicCrudOperations';
import { Macros } from 'src/entities/macros.entity';
import { MacrosClient } from 'src/entities/macrosClient.entity';
import { MacrosTrainer } from 'src/entities/macrosTrainer.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MacrosService extends BasicCrud {
  constructor(
    @InjectRepository(Macros)
    private readonly macrosRepository: Repository<Macros>,
    @InjectRepository(MacrosTrainer)
    private readonly macrosTrainerRepository: Repository<MacrosTrainer>,
    @InjectRepository(MacrosClient)
    private readonly macrosClientRepository: Repository<MacrosClient>,
  ) {
    super();
  }

  async create(user: Users, trainer: Trainers): Promise<Macros> {
    try {
      let macros = await this.macrosRepository.create({ user, trainer });

      macros = await this.macrosRepository.save(macros);

      const macrosClient = await this.macrosClientRepository.create({
        macro: macros,
      });
      await this.macrosClientRepository.save(macrosClient);

      const macrosTrainer = await this.macrosTrainerRepository.create({
        macro: macros,
      });

      await this.macrosTrainerRepository.save(macrosTrainer);

      return macros;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid macros data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(macrosData: Macros) {
    return await this.macrosRepository.update(
      { user: macrosData.user },
      macrosData,
    );
  }

  async find(user) {
    return await this.macrosRepository.findOne({
      where: { user },
      relations: ['macrosClient', 'macrosTrainer'],
    });
  }

  delete() {
    //nothing
  }
}
