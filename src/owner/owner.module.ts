import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { TrainerModule } from 'src/trainer/trainer.module';
import { UserModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { Owners } from '../entities/owners.entity';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Owners]), UserModule, TrainerModule],
  providers: [OwnerService],
  controllers: [OwnerController],
  exports: [OwnerService],
})
export class OwnerModule {}
