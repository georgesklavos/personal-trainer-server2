import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicCrud } from 'src/abstractClasses/basicCrudOperations';
import { ClientsDay } from 'src/entities/ClientsDay.entity';
import { Days } from 'src/entities/Days.entity';
import { TrainersDay } from 'src/entities/TrainersDay.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DaysService extends BasicCrud {
  constructor(
    @InjectRepository(Days) private readonly daysRepository: Repository<Days>,
    @InjectRepository(ClientsDay)
    private readonly clientDayRepository: Repository<ClientsDay>,
    @InjectRepository(TrainersDay)
    private readonly trainerDayRepository: Repository<TrainersDay>,
  ) {
    super();
  }

  async create(user: Users, date: Date): Promise<number> {
    const clientDay = await this.clientDayRepository.create();
    await this.clientDayRepository.save(clientDay);
    const trainerDay = await this.trainerDayRepository.create();
    await this.trainerDayRepository.save(trainerDay);
    const days = await this.daysRepository.create({
      date,
      user,
      clientDay,
      trainerDay,
    });
    return await (
      await this.daysRepository.save(days)
    ).id;
  }

  find() {
    //nothing
  }

  update() {
    //nothing
  }

  delete() {
    //nothing
  }
}
