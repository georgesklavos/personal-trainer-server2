import { Body, Controller, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HowYouFeel } from 'src/entities/HowYouFeel.entity';
import { HowYouFeelService } from 'src/how-you-feel/how-you-feel.service';

@Controller('client')
export class ClientController {
  constructor(private readonly howYouFeelService: HowYouFeelService) {}

  @Put('/api/rate')
  async createHowYouFeel(@Body() data: HowYouFeel) {
    return await this.howYouFeelService.createHowYouFeel(data);
  }
}
