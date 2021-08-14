import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { ClientService } from 'src/client/clients.service';
import { Clients } from 'src/entities/clients.entity';
import { Macros } from 'src/entities/macros.entity';
import { Users } from 'src/entities/users.entity';
import { MacrosService } from 'src/macros/macros.service';
import { PaymentsService } from 'src/payments/payments.service';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Controller()
export class OwnerTrainerController {
  constructor(
    private readonly clientsService: ClientService,
    private readonly paymentsServise: PaymentsService,
  ) {}

  @UseGuards(JwtAuthGaurd)
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

  @UseGuards(JwtAuthGaurd)
  @Get('payment/')
  async verifyPayment(@Query() params) {
    try {
      return await this.paymentsServise.validatePayment(
        params.client,
        params.month,
        params.year,
      );
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

  @UseGuards(JwtAuthGaurd)
  @Post('payment/')
  async createPayment(@Body() body) {
    try {
      return await this.paymentsServise.createPayment(body);
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
