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
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { ClientService } from 'src/client/clients.service';
import { DaysService } from 'src/days/days.service';
import { HowYouFeel } from 'src/entities/HowYouFeel.entity';
import { Macros } from 'src/entities/macros.entity';
import { ExercisesService } from 'src/exercises/exercises.service';
import { ErrorException } from 'src/filters/error.exceptions';
import { IsOwnerOrIsTrainer } from 'src/guards/isOwnerOrIsTrainer.guard';
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
  @UseGuards(JwtAuthGaurd, IsOwnerOrIsTrainer)
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

  @UseGuards(JwtAuthGaurd, IsOwnerOrIsTrainer)
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

  @UseGuards(JwtAuthGaurd, IsOwnerOrIsTrainer)
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

  @UseGuards(JwtAuthGaurd, IsOwnerOrIsTrainer)
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

  @UseGuards(JwtAuthGaurd, IsOwnerOrIsTrainer)
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

  @UseGuards(JwtAuthGaurd, IsOwnerOrIsTrainer)
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

  @UseGuards(JwtAuthGaurd, IsOwnerOrIsTrainer)
  @Get('/day/exercise')
  async getExercises(@Body() data: searchUserDateDto) {
    try {
      return await this.exerciseService.findOne(data);
    } catch (err) {
      this.Logger.error(err);
      throw new ErrorException();
    }
  }

  @UseGuards(JwtAuthGaurd, IsOwnerOrIsTrainer)
  @Get('/day/macros')
  async getMacros(@Req() req, @Body('user') user): Promise<Macros> {
    try {
      return this.macrosService.get(user);
    } catch (err) {
      this.Logger.error(err);
      throw new ErrorException();
    }
  }
}
