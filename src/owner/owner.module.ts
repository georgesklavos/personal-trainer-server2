import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/client/clients.module';
import { Users } from 'src/entities/users.entity';
import { TrainerModule } from 'src/trainer/trainer.module';
import { UserModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { Owners } from '../entities/owners.entity';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owners]),
    UserModule,
    TrainerModule,
    ClientModule,
  ],
  providers: [OwnerService],
  controllers: [OwnerController],
  exports: [OwnerService],
})
export class OwnerModule {}
