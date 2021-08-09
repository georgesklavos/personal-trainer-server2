import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Macros } from 'src/entities/macros.entity';
import { MacrosClient } from 'src/entities/macrosClient.entity';
import { MacrosTrainer } from 'src/entities/macrosTrainer.entity';
import { MacrosService } from './macros.service';

@Module({
  imports: [TypeOrmModule.forFeature([Macros, MacrosClient, MacrosTrainer])],
  providers: [MacrosService],
  exports: [MacrosService],
})
export class MacrosModule {}
