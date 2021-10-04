import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { HowYouFeel } from 'src/entities/HowYouFeel.entity';
import { IsClient } from 'src/guards/isClient.guard';
import { HowYouFeelService } from 'src/how-you-feel/how-you-feel.service';

@Controller('client')
export class ClientController {
  constructor(private readonly howYouFeelService: HowYouFeelService) {}

  @ApiTags('Client')
  @UseGuards(JwtAuthGaurd, IsClient)
  @Put('/api/rate')
  async createHowYouFeel(@Body() data: HowYouFeel) {
    return await this.howYouFeelService.create(data);
  }
}
