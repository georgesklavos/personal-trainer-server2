import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { Systems } from 'src/entities/systems.entity';
import { MutualController } from './mutual.controller';
import { MutualService } from './mutual.service';

@Module({
  imports: [TypeOrmModule.forFeature([Systems, Roles])],
  controllers: [MutualController],
  providers: [MutualService],
})
export class MutualModule {}
