import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { ClientService } from 'src/client/clients.service';
import { Clients } from 'src/entities/clients.entity';
import { Owners } from 'src/entities/owners.entity';
import { Roles } from 'src/entities/roles.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { ErrorException } from 'src/filters/error.exceptions';
import { OwnerService } from 'src/owner/owner.service';
import { roles } from 'src/seeds/roles.seed';
import { TrainerService } from 'src/trainer/trainer.service';
import { updateProfileDto } from './updateProfile.dto';
import { UserService } from './users.service';

@Controller()
export class UserController {}
