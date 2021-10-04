import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicCrud } from 'src/abstractClasses/basicCrudOperations';
import { Videos } from 'src/entities/videos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService extends BasicCrud {
  constructor(
    @InjectRepository(Videos)
    private readonly videosRepository: Repository<Videos>,
  ) {
    super();
  }

  async create(data) {
    //vres to relation pou tha ginei me ta exercises
    await this.videosRepository.create(data);
  }

  async find(data) {
    await this.videosRepository.find(data);
  }

  async update() {
    //nothing
  }

  async delete() {
    //nothing
  }
}
