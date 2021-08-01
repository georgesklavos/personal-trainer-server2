import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/client/clients.module';
import { Trainers } from 'src/entities/trainers.entity';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainers]), ClientModule],
  controllers: [TrainerController],
  providers: [TrainerService],
  exports: [TrainerService],
})
export class TrainerModule {}
