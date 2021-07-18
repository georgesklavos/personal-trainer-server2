import { Module } from '@nestjs/common';
import { OwnerTrainerController } from './owner-trainer.controller';
import { OwnerTrainerService } from './owner-trainer.service';

@Module({
  controllers: [OwnerTrainerController],
  providers: [OwnerTrainerService]
})
export class OwnerTrainerModule {}
