import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HowYouFeel } from 'src/entities/HowYouFeel.entity';
import { Raw, Repository } from 'typeorm';
import { HowYouFeelDto } from './howYouFeel.dto';

@Injectable()
export class HowYouFeelService {
  constructor(
    @InjectRepository(HowYouFeel)
    private readonly howYouFeelRepository: Repository<HowYouFeel>,
  ) {}

  async createHowYouFeel(data: HowYouFeel) {
    const newHowYouFeel = await this.howYouFeelRepository.create(data);

    return (await this.howYouFeelRepository.save(newHowYouFeel)).id;
  }

  async getHowYouFeel(data: HowYouFeelDto): Promise<HowYouFeel[]> {
    return await this.howYouFeelRepository.find({
      client: data.client,
      date: Raw(
        (alias) =>
          `MONTH(${alias}) = ${data.month}` && `YEAR(${alias}) = ${data.year}`,
      ),
    });
  }
}
