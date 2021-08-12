import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/client/clients.module';
import { Days } from 'src/entities/Days.entity';
import { Exercises } from 'src/entities/exercises.entity';
import { Macros } from 'src/entities/macros.entity';
import { OwnerTrainerController } from './owner-trainer.controller';
import { OwnerTrainerService } from './owner-trainer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Macros, Exercises, Days]), ClientModule],
  controllers: [OwnerTrainerController],
  providers: [OwnerTrainerService],
})
export class OwnerTrainerModule {}
