import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Owners } from 'src/entities/owners.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { Users } from 'src/entities/users.entity';
import { TrainerService } from 'src/trainer/trainer.service';
import { UserInterceptor } from 'src/users/users.interceptor';
import { UserService } from 'src/users/users.service';
import { OwnerService } from './owner.service';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { Clients } from 'src/entities/clients.entity';
import { ClientService } from 'src/client/clients.service';

@Controller()
export class OwnerController {
  constructor(
    private readonly userService: UserService,
    private readonly ownerService: OwnerService,
    private readonly trainerService: TrainerService,
    private readonly clientService: ClientService,
  ) {}
  @UseInterceptors(UserInterceptor)
  @Post('signup')
  async signup(@Body() body: Users & Owners) {
    try {
      const user = await this.userService.createUser(
        body.firstName,
        body.lastName,
        body.email,
        body.password,
        body.currency,
        body.gender,
        body.systemType,
        body.language,
        body.role,
      );

      await this.ownerService.createOwner(
        user,
        body.phone,
        body.clients,
        body.trainers,
        body.active,
      );
      return user;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user information',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGaurd)
  @Put('trainer')
  async createTraienr(@Request() req, @Body() body: Users & Trainers) {
    // console.log(req.user);
    try {
      const user = await this.userService.createUser(
        body.firstName,
        body.lastName,
        body.email,
        body.password,
        body.currency,
        body.gender,
        body.systemType,
        body.language,
        body.role,
      );
      const owner = await this.ownerService.findOwnerByUserId(req.user.id);

      await this.trainerService.createTrainer(
        user,
        owner,
        body.age,
        body.level,
        body.active,
        body.verifyPayments,
        body.paymentNumber,
        body.notes,
        body.clientsNumber,
      );
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid trainer information',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGaurd)
  @Put('client')
  async createClient(@Request() req, @Body() body: Users & Clients) {
    try {
      const user = await this.userService.createUser(
        body.firstName,
        body.lastName,
        body.email,
        body.password,
        body.currency,
        body.gender,
        body.systemType,
        body.language,
        body.role,
      );
      const owner = await this.ownerService.findOwnerByUserId(req.user.id);

      await this.clientService.createClient(
        user,
        owner,
        body.age,
        body.level,
        body.active,
        body.payment,
        body.program,
        body.lastWeightNumber,
        body.heightNumber,
        body.target,
        body.startDate,
        body.endDate,
        body.notes,
        body.trainer,
        body.viewedByTrainer,
      );
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid client information',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGaurd)
  @Get('clients')
  async getClients(@Request() req): Promise<Clients[]> {
    try {
      const owner = await this.ownerService.findOwnerByUserId(req.user.id);

      const users = await this.clientService.getClients(owner);

      return users;
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
  @Get('trainers')
  async getTrainers(@Request() req): Promise<Trainers[]> {
    try {
      const owner = await this.ownerService.findOwnerByUserId(req.user.id);

      const trainers = await this.trainerService.getTrainers(owner);

      return trainers;
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
