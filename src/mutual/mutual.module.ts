import { Module } from '@nestjs/common';
import { MutualController } from './mutual.controller';
import { MutualService } from './mutual.service';

@Module({
  controllers: [MutualController],
  providers: [MutualService]
})
export class MutualModule {}
