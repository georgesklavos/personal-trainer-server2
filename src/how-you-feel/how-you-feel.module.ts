import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HowYouFeel } from 'src/entities/HowYouFeel.entity';
import { HowYouFeelService } from './how-you-feel.service';

@Module({
  imports: [TypeOrmModule.forFeature([HowYouFeel])],
  providers: [HowYouFeelService],
  exports: [HowYouFeelService],
})
export class HowYouFeelModule {}
