import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Videos } from 'src/entities/videos.entity';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Videos])],
  providers: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
