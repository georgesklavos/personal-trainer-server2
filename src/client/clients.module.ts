import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clients } from 'src/entities/clients.entity';
import { ClientController } from './clients.controller';
import { ClientService } from './clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clients])],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
