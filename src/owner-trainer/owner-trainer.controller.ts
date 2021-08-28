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
  Logger,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { ClientService } from 'src/client/clients.service';
import { DaysService } from 'src/days/days.service';
import { HowYouFeel } from 'src/entities/HowYouFeel.entity';
import { Macros } from 'src/entities/macros.entity';
import { Users } from 'src/entities/users.entity';
import { ExercisesService } from 'src/exercises/exercises.service';
import { ErrorException } from 'src/filters/error.exceptions';
import { HowYouFeelService } from 'src/how-you-feel/how-you-feel.service';
import { HowYouFeelDto } from 'src/how-you-feel/howYouFeel.dto';
import { MacrosService } from 'src/macros/macros.service';
import { PaymentsService } from 'src/payments/payments.service';
import { VerifyPaymentDto } from 'src/payments/verifyPayment.dto';
import { dayCreateDto } from './dayCreate.dto';
import { dayCreateUpdateDto } from './dayCreateUpdate.dto';
import { searchUserDateDto } from './searchUserDate.dto';

@Controller()
export class OwnerTrainerController {
  constructor(
    private readonly clientsService: ClientService,
    private readonly paymentsServise: PaymentsService,
    private readonly howYouFeelService: HowYouFeelService,
    private readonly macrosService: MacrosService,
    private readonly exerciseService: ExercisesService,
    private readonly daysService: DaysService,
  ) {}
  private readonly Logger = new Logger(OwnerTrainerController.name);
  @UseGuards(JwtAuthGaurd)
  @Put('trainerViewed/:user')
  async viewedByTrainer(@Param() params) {
    await this.clientsService.viewedByTrainer(params.user);
    try {
    } catch (err) {
      this.Logger.error(err);
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
      this.Logger.error(err);
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
  @Put('verifyPayment/')
  async createPayment(@Body() body: VerifyPaymentDto, @Req() req) {
    try {
      body.userVerified = req.user.id;
      await this.paymentsServise.verifyPayment(body);
    } catch (err) {
      this.Logger.error(err);
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
      this.Logger.error(err);
      throw new ErrorException();
    }
  }

  @UseGuards(JwtAuthGaurd)
  @Post('/day')
  async createDay(@Body() data: dayCreateDto) {
    try {
      await this.macrosService.create(data.user, data.trainer);
      await this.exerciseService.create(data);
      await this.daysService.create(data.user, data.exercise.date);
    } catch (err) {
      this.Logger.error(err);
      throw new ErrorException();
    }
  }

  @UseGuards(JwtAuthGaurd)
  @Put('/day')
  async updateDay(@Body() data: dayCreateUpdateDto) {
    try {
      await this.macrosService.update(data.macros);
      await this.exerciseService.update(data.exercise);
    } catch (err) {
      this.Logger.error(err);
      throw new ErrorException();
    }
  }

  @UseGuards(JwtAuthGaurd)
  @Get('/day/exercise')
  async getExercises(@Body() data: searchUserDateDto) {
    try {
      return await this.exerciseService.findOne(data);
    } catch (err) {
      this.Logger.error(err);
      throw new ErrorException();
    }
  }

  @UseGuards(JwtAuthGaurd)
  @Get('/day/macros')
  async getMacros(@Body('user') user): Promise<Macros> {
    try {
      return this.macrosService.get(user);
    } catch (err) {
      this.Logger.error(err);
      throw new ErrorException();
    }
  }
}
