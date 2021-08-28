import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsDay } from 'src/entities/ClientsDay.entity';
import { Days } from 'src/entities/Days.entity';
import { TrainersDay } from 'src/entities/TrainersDay.entity';
import { DaysService } from './days.service';

@Module({
  imports: [TypeOrmModule.forFeature([Days, ClientsDay, TrainersDay])],
  providers: [DaysService],
  exports: [DaysService],
})
export class DaysModule {}
