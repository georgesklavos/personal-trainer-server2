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
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { ClientService } from 'src/client/clients.service';
import { Clients } from 'src/entities/clients.entity';
import { HowYouFeel } from 'src/entities/HowYouFeel.entity';
import { Macros } from 'src/entities/macros.entity';
import { Users } from 'src/entities/users.entity';
import { ErrorException } from 'src/filters/error.exceptions';
import { HowYouFeelService } from 'src/how-you-feel/how-you-feel.service';
import { HowYouFeelDto } from 'src/how-you-feel/howYouFeel.dto';
import { MacrosService } from 'src/macros/macros.service';
import { PaymentsService } from 'src/payments/payments.service';
import { VerifyPaymentDto } from 'src/payments/verifyPayment.dto';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Controller()
export class OwnerTrainerController {
  constructor(
    private readonly clientsService: ClientService,
    private readonly paymentsServise: PaymentsService,
    private readonly howYouFeelService: HowYouFeelService,
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
      return await this.paymentsServise.getPayment(
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
  @Post('verifyPayment/')
  async createPayment(@Body() body: VerifyPaymentDto, @Req() req) {
    try {
      body.userVerified = req.user.id;
      await this.paymentsServise.verifyPayment(body);
    } catch (err) {
      console.log(err);
      throw new ErrorException();
    }
  }

  @UseGuards(JwtAuthGaurd)
  @Get('howYouFeel/')
  async getHowYouFeel(@Param() params: HowYouFeelDto): Promise<HowYouFeel[]> {
    try {
      //Gia na elegxw an o client anikei ston trainer i ston owner tha valoumme parametro sto jwt pou tha krataei to role
      return await this.howYouFeelService.getHowYouFeel(params);
    } catch (err) {
      console.log(err);
      throw new ErrorException();
    }
  }
}
