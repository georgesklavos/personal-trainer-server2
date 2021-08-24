import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { MutualService } from './mutual.service';

@Controller('mutual')
export class MutualController {
  constructor(private readonly mutualService: MutualService) {}

  @Get('/types')
  @UseGuards(JwtAuthGaurd)
  async getTypes() {
    return await this.mutualService.getTypes();
  }
}
