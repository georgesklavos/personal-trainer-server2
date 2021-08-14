import { Module } from '@nestjs/common';
import { HowYouFeelService } from './how-you-feel.service';

@Module({
  providers: [HowYouFeelService],
  exports: [HowYouFeelService],
})
export class HowYouFeelModule {}
