import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clients } from 'src/entities/clients.entity';
import { HowYouFeel } from 'src/entities/HowYouFeel.entity';
import { HowYouFeelModule } from 'src/how-you-feel/how-you-feel.module';
import { ClientController } from './clients.controller';
import { ClientService } from './clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clients, HowYouFeel]), HowYouFeelModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
