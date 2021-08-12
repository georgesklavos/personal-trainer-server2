import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/clients.service';
import { Clients } from 'src/entities/clients.entity';
import { Macros } from 'src/entities/macros.entity';
import { Users } from 'src/entities/users.entity';
import { MacrosService } from 'src/macros/macros.service';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Controller()
export class OwnerTrainerController {
  constructor(private readonly clientsService: ClientService) {}
  @Post('trainerViewed/:user')
  async viewedByTrainer(@Param() params) {
    await this.clientsService.viewedByTrainer(params.user);
    try {
    } catch (err) {
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
