import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/client/clients.module';
import { HelperTablesModule } from 'src/helper-tables/helper-tables.module';
import { MacrosModule } from 'src/macros/macros.module';
import { TrainerModule } from 'src/trainer/trainer.module';
import { UserModule } from 'src/users/users.module';
import { Owners } from '../entities/owners.entity';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owners]),
    UserModule,
    TrainerModule,
    ClientModule,
    MacrosModule,
    HelperTablesModule,
  ],
  providers: [OwnerService],
  controllers: [OwnerController],
  exports: [OwnerService],
})
export class OwnerModule {}
