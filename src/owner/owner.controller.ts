import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
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
import { MacrosService } from 'src/macros/macros.service';
import { HelperTablesService } from 'src/helper-tables/helper-tables.service';
import { trainerCreateUpdateDto } from './trainerCreateUpdate.dto';
import { clientCreateUpdateDto } from './clientCreateUpdate.dto';
import { ownerCreateUpdateDto } from './ownerCreateUpdate.dto';
import { IsOwner } from 'src/guards/isOwner.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class OwnerController {
  constructor(
    private readonly userService: UserService,
    private readonly ownerService: OwnerService,
    private readonly trainerService: TrainerService,
    private readonly clientService: ClientService,
    private readonly macrosService: MacrosService,
    private readonly helperTablesService: HelperTablesService,
  ) {}

  @ApiTags('Owner')
  @UseGuards(JwtAuthGaurd, IsOwner)
  @Put('trainer')
  async createTraienr(@Request() req, @Body() data: trainerCreateUpdateDto) {
    // console.log(req.user);
    try {
      const user = await this.userService.create(data.user);
      const owner = await this.ownerService.findOwnerByUserId(req.user.id);

      data.trainer.user = user;
      data.trainer.owner = owner;
      await this.trainerService.create(data.trainer);
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

  @ApiTags('Owner')
  @UseGuards(JwtAuthGaurd, IsOwner)
  @Put('client')
  async createClient(@Request() req, @Body() data: clientCreateUpdateDto) {
    try {
      const user = await this.userService.create(data.user);
      const owner = await this.ownerService.findOwnerByUserId(req.user.id);
      data.client.user = user;
      data.client.owner = owner;
      await this.clientService.create(data.client);

      await this.macrosService.create(user, data.client.trainer);
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

  @ApiTags('Owner')
  @UseGuards(JwtAuthGaurd, IsOwner)
  @Get('clients')
  async getClients(@Request() req): Promise<Clients[]> {
    try {
      const owner = await this.ownerService.findOwnerByUserId(req.user.id);

      const clients = await this.clientService.getClientsOwner(owner);

      return clients;
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

  @ApiTags('Owner')
  @UseGuards(JwtAuthGaurd, IsOwner)
  @Get('trainers')
  async getTrainers(@Request() req): Promise<Trainers[]> {
    try {
      const owner = await this.ownerService.findOwnerByUserId(req.user.id);

      const trainers = await this.trainerService.find(owner);

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

  @ApiTags('Owner')
  @UseGuards(JwtAuthGaurd, IsOwner)
  @Patch('client/:id')
  async updateClient(@Param() params, @Body() data: clientCreateUpdateDto) {
    try {
      this.userService.update(data.user);

      this.clientService.update(data.client);
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

    // this.clientService.
  }

  @ApiTags('Owner')
  @UseGuards(JwtAuthGaurd, IsOwner)
  @Patch('trainer/:id')
  async updateTrainer(@Param() params, @Body() data: trainerCreateUpdateDto) {
    try {
      this.userService.update(data.user);

      this.trainerService.update(data.trainer);
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

    // this.clientService.
  }

  @ApiTags('Owner')
  @UseGuards(JwtAuthGaurd, IsOwner)
  @Get('helperTables')
  async getHelperTables() {
    try {
      return await this.helperTablesService.getHelperTables([]);
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
