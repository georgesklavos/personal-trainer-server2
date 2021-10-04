import {
  Controller,
  Get,
  UseGuards,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { ClientService } from 'src/client/clients.service';
import { Clients } from 'src/entities/clients.entity';
import { IsTrainer } from 'src/guards/isTrainer.guard';
import { TrainerService } from './trainer.service';

@Controller('trainer')
export class TrainerController {
  constructor(
    private readonly clientService: ClientService,
    private readonly trainerService: TrainerService,
  ) {}

  @ApiTags('Trainer')
  @UseGuards(JwtAuthGaurd, IsTrainer)
  @Get('clients')
  async getUsers(@Request() req): Promise<Clients[]> {
    try {
      const trainer = await this.trainerService.findTrainerByUserId(
        req.user.id,
      );

      const clients = await this.clientService.getClientsTrainer(trainer);

      return clients;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'An error occured',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
